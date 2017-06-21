var savedPlans=[]

$(document).on("pagebeforeshow","#saveAndLoad",function(){
  $("#defaultTemplates").on('click', 'a',function(){
    loadSaved(template1)
  });
  $("#userTemplates").on('click', 'a',function(){
    var templateNumber=(this.id.replace(/\D/g,''));
    var templateData=Lockr.get('savedPlans')[templateNumber].data;
    loadSaved(templateData)
  })
  //get modification type and run appropriate function
  $("#userTemplatesEdit").on('click', 'button',function(event){
    //stop funciton getting fired twice - listeners attached multiple times for some reason
    event.stopImmediatePropagation();
    var num=(this.id.replace(/\D/g,''));
    var f=(this.id).replace(/[0-9]/g, '');
    window[f](num)
  })
  prepareTemplates()
});

function prepareTemplates(){
  $("#savedTemplates").empty()
  $("#userTemplates").empty()
  $("#userTemplatesEdit").empty()
  savedPlans=Lockr.get('savedPlans')
  if(savedPlans==undefined){savedPlans=[]}
  console.log(savedPlans)
  $.each(savedPlans,function(i,v){
    $("#userTemplates").append('<a href="#planner" id="userTemplate'+i+'" data-role="button">'+v.name+'</a> ')
    $("#userTemplatesEdit").append('<div id=editControl'+i+' data-role="controlgroup" data-type="horizontal"><button id=templateEdit'+i+' data-icon="edit" data-mini="true" data-iconpos="notext">edit</button><button id=templateDelete'+i+' data-icon="delete" data-mini="true" data-iconpos="notext">delete</button></div>').trigger('create')
  })
  $("#userTemplates").trigger('create')
}

function loadSaved(data){
  //generate blank then load data
  createNewDocument()
  createTimePeriods(data.timePeriods)
  loadDroppedCards(data.cards)
  jsonValues=data.values
  console.log(jsonValues)
  menuClose()
}

//create empty placeholder for specified number of time periods
function createTimePeriods(numberOfPeriods){
  for(i=0;i<numberOfPeriods-1;i++){
    addTimePeriod()
  }
}

function templateEdit(index){
  console.log('editing index '+index)
  var name=prompt('name')
  savedPlans[index].name=name
  Lockr.set('savedPlans',savedPlans)
  prepareTemplates()
}

function templateDelete(index){
  console.log('deleting index '+index)
  savedPlans.splice(index,1)
  Lockr.set('savedPlans',savedPlans)
  prepareTemplates()
}

function loadDroppedCards(cards){
  $.each(cards,function(i,v){
    console.log(v)
    var cardID=v.timePeriod+"_"+v.card+"_"+v.index
    var cardClass="Card "+v.type+"Card dropped "
    var cardSlotID="T"+ v.timePeriod+"_"+ v.type+"Slot_"+v.index
    console.log(cardSlotID)
    console.log($('#'+cardSlotID).html())
    console.log(cardSlotID)
    //add empty drop slot if doesn't exist
    if( $('#'+cardSlotID).html()==undefined){
      console.log('making slot')
      $('#'+ v.type+'Slots'+ v.timePeriod).append("<div class='slotCard timePeriod"+v.timePeriod+" "+ v.Type+"Slot ui-droppable' id='"+cardSlotID+"'>input</div>")
    }
    //append card onto drop slot
    $('#'+cardSlotID).append("<div id="+cardID+" class='"+cardClass+"'>"+v.card+"</div>")
    var imageURL=getImage(v.type,v.card)
    $('#'+cardID)
      .css("background-image","url('"+imageURL+"')")
      .on('click', DroppedCardClickFunction);
  })


}

function getImage(type,card){
  var url="none"
  $.each(allData,function(i,v){
    if(v.Type==type){
      if(v.ID==card){
        url= v.Image;
      }
    }
    return('none')
  })
  return url
}

//function to create placeholder for time periods and resize
function addTimePeriod(){
  timePeriod++
  //html to make main boxes, adjust widths and append to main section
  var temp="<div id='timePeriod"+timePeriod+"' class='expanded'><h3>Time Period "+timePeriod+"</h3><div id='cardSslots'><div id='activitySlots"+timePeriod+"' class='Slots'><h6>Activities</h6></div><div id='inputSlots"+timePeriod+"' class='Slots'><h6>Inputs</h6></div><div id='labourSlots"+timePeriod+"' class='Slots'><h6>Family Labour</h6></div><div id='outputSlots"+timePeriod+"' class='Slots'><h6>Outputs</h6></div><div id='consumedSlots"+timePeriod+"' class='Slots'><h6>Produce Consumed</h6></div></div></div>"
  var width=timePeriod*158+256
  $('#mainSection')
    .css('width',width)
    .append(temp)
    .animatescroll()
  //contract previous section, expand new section, add ability as click function
  for(var i=1;i<timePeriod;i++){
    $('#timePeriod'+i).removeClass('expanded').addClass('contracted')
  }
  $('#timePeriod'+timePeriod+' h3').click(function(){
    $('.expanded').addClass('contracted').removeClass('expanded');
    $(this).parent().addClass('expanded').removeClass('contracted');
  })
  //add empty slots
  $.each(slotTypes,function(i,val){
    for (var j=0; j<1; j++){
      $('#'+slotTypes[i]+'Slots'+timePeriod).append(newSlotCard(slotTypes[i],0,timePeriod));
    }
    //set new active slot
    showNextCards('activity');
    $('.activeDrop').removeClass('activeDrop');
    $('#T'+timePeriod+'_activitySlot'+'_0').addClass('activeDrop')
  })
}

function saveLayout(){
  //clear cache - move later
  //Lockr.set('savedPlans',[])
  var temp={}
  console.log('saving layout')
  temp.timePeriods=timePeriod
  temp.cards=[]
  temp.values=jsonValues
  $('.Card.dropped').each(function(i,v){
    temp['cards'].push(getCardJson(v))
  })
  console.log(temp)
  var name=prompt("Name:","My Budget")
  if(name==undefined){name="My Budget"}
  savedPlans=Lockr.get('savedPlans')
  if(savedPlans==undefined){savedPlans=[]}
  temp={
    name:name,
    data:temp,
  }
  if(savedPlans!=undefined){
    savedPlans.push(temp)
  }
  else savedPlans[0]=temp
  console.log(savedPlans)
  Lockr.set('savedPlans',savedPlans)
}

function getCardJson(card){
  var temp={}
  var c=card.id.split("_")
  temp.timePeriod=c[0]
  //get type from background image url
  //note in future better to format card as: timePeriod_Type_CardName_Index
  temp.card=c[1]
  temp.type=card.style.backgroundImage.split('/')[1]
  temp.index=c[2]
  if(jsonValues[card.id]!=undefined){
    temp.quantity=jsonValues[card.id].Quantity
    temp.value=jsonValues[card.id].Value
  }
  return(temp)
}

function createNewDocument(){
  $('#plannerTemplate').show()
  console.log('creating new')
  activeType='activity'
  activeTimePeriod=1
  totalSlots=0
  timePeriod=0
  $('#mainSection').empty()
  addTimePeriod()
  $('#T1_activitySlot_0').addClass('activeDrop')
}


var template1=
{	timePeriods:10,
  timePeriodTitles:[],
  cards:[
    {
      timePeriod:1,
      type:'activity',
      card:'land-clearing',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:1,
      type:'input',
      card:'labour-(paid)',
      order:0,
      quantity:2,
      value:45
    },
    {
      timePeriod:2,
      type:'activity',
      card:'ploughing',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:2,
      type:'input',
      card:'tractor-hire',
      order:0,
      quantity:2,
      value:50
    },
    {
      timePeriod:3,
      type:'activity',
      card:'sowing',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:3,
      type:'input',
      card:'seeds',
      order:0,
      quantity:20,
      value:3
    },
    {
      timePeriod:4,
      type:'activity',
      card:'weeding',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:4,
      type:'input',
      card:'labour-(paid)',
      order:0,
      quantity:2,
      value:30
    },
    {
      timePeriod:5,
      type:'activity',
      card:'apply-fertiliser',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:5,
      type:'input',
      card:'fertiliser',
      order:0,
      quantity:6,
      value:100
    },
    {
      timePeriod:5,
      type:'input',
      card:'labour-(paid)',
      order:1,
      quantity:null,
      value:null
    },
    {
      timePeriod:6,
      type:'activity',
      card:'harvesting',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:6,
      type:'input',
      card:'labour-(paid)',
      order:0,
      quantity:4,
      value:45
    },
    {
      timePeriod:7,
      type:'activity',
      card:'shelling',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:7,
      type:'input',
      card:'sheller(hire)',
      order:0,
      quantity:1,
      value:160
    },
    {
      timePeriod:7,
      type:'output',
      card:'crop',
      order:0,
      quantity:20,
      value:100
    },
    {
      timePeriod:8,
      type:'activity',
      card:'bagging',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:8,
      type:'input',
      card:'bags',
      order:0,
      quantity:10,
      value:8
    },
    {
      timePeriod:9,
      type:'activity',
      card:'storage',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:9,
      type:'input',
      card:'chemicals',
      order:0,
      quantity:1,
      value:20
    },
    {
      timePeriod:10,
      type:'activity',
      card:'marketing-and-selling',
      order:0,
      quantity:null,
      value:null
    },
    {
      timePeriod:10,
      type:'input',
      card:'transportation-(hire)',
      order:0,
      quantity:1,
      value:40
    },

  ]}
