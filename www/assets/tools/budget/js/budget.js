var slotTypes=["activity","input","labour","output","consumed","cashBalance"]
var slotTypesIndex={activity:0,input:1,labour:2,output:3,consumed:4};
var activities = [1,2,3,4,5];
var activeCard, activeSlot, nextCard, activeCardMeta, activeCardIndex
var activeCardSlot='T1_activitySlot_0';
var activeType='activity'
var activeTimePeriod=1
var totalSlots=0
var timePeriod=1
var draggedID

$(document).ready(function() {
  //run card initialisation function
  $( init );
  $('#addTimePeriod').click(function(){addTimePeriod()})
  $('#timePeriod1 h3').click(function(){
    $('.expanded').addClass('contracted').removeClass('expanded');
    $(this).parent().addClass('expanded').removeClass('contracted');
  })
  $('#remove').click(function(){removeCard()})
  $('#add').click(function(){addCard()})
  $('#setValues').click(function(){
    $( "#values-panel" ).panel("open");
    $( "#popupArrow" ).popup( "close")
  })
});

//function to make popupbox appear when dropped activity card clicked on
$.mobile.document.on( "click", ".Card.dropped", function( evt ) {
 /* $( "#popupArrow" ).popup( "open", { x: evt.pageX, y: evt.pageY } );
  evt.preventDefault();*/
 // $( "#values-panel" ).panel("open")
  //DroppedCardClickFunction()
});


function init() {
//create cards for every possible type
  createFooterCards();
//create initial card big boxes and append to page
  createCardBoxes();
//hide all slots except for Activities, highlight first drop cell
  $('.cardHolder').hide()
  $('#activityCards').show()


  //makeFooterScroller()
}

function addCard(){
  //find out which type, time period and index by looking at parent holder
  console.log(activeCardMeta);
  activeType=activeCardMeta[1].replace('Slot','');
  activeCardIndex=parseInt(activeCardMeta[2]);
  activeTimePeriod=activeCardMeta[0].replace('T','');
  console.log('type: '+activeType);
  console.log('time period: '+activeTimePeriod);
  console.log('index: '+activeCardIndex);
  var nextIndex=activeCardIndex+1;
  console.log(nextIndex)
  //append new slot and close
 $('#'+activeType+'Slots'+activeTimePeriod).append(newSlotCard(activeType,nextIndex,activeTimePeriod));
  //set activeCell to newly created and remove elsewhere	, change blocks
   nextCardSlot('horizontal');
  $( "#values-panel" ).panel("close");
}

function removeCard(){
  //remove stored data
  activeCardMeta=(activeCard.parent().prop('id').split('_'));
  console.log(activeCardMeta);
  activeType=activeCardMeta[1].replace('Slot','');
  activeCardIndex=parseInt(activeCardMeta[2]);
  activeTimePeriod=activeCardMeta[0].replace('T','');
 // removeValue(activeCardType,activeCardItem,activeTimePeriod)
  removeJson(activeCard.prop('id'))
  //remove card and reset slot properties. remove drop slot if not first
  if(activeCardIndex>0){ activeCard.parent().remove() }
  else{
    activeCard.parent().droppable('enable')
    activeCard.parent().removeClass('droppedOn')
    activeCard.parent().bind("click",CardSlotClickFunction)
  }
  activeCard.remove();
  $( "#popupArrow" ).popup( "close")
  $( "#values-panel" ).panel("close");

  //set active cell and cards

  calculateBudget()
}

function createFooterCards(){
  $.each(allData,function(index,value){
    $('<div>'+value.Name+'</div>')
    //	.data('activity',activities[i])
      .attr('id',value.ID+'Card')
      .addClass('Card')
      .addClass(value.Type+'Card')
      .appendTo('#'+value.Type+'Cards')
      .draggable({
        //containment: '#content',
        stack: '.cardHolders',
        cursor: 'move',
        revert: false,
        helper: "clone",
      })
      .css('background-image', 'url('+value.Image+')')
      .on('dragstart',function(){
        draggedID=$(this).prop('id').replace('Card','')
        console.log(draggedID)
      });

  })
}

function createCardBoxes(){
  $.each(slotTypes,function(i,val){
    for (var j=0; j<1; j++){
      $('#'+slotTypes[i]+'Slots'+timePeriod).append(newSlotCard(slotTypes[i],0));
    }
  })
}

//create slots to receive cards
function newSlotCard(type,idValue, timePeriod){
  //totalSlots++
  return($('<div>'+type+'</div>')
    .addClass('slotCard')
    .addClass('timePeriod'+timePeriod)
    .addClass(type+'Slot')
    .attr('id','T'+timePeriod+'_'+type+'Slot'+'_'+idValue)
    .on('click', CardSlotClickFunction)
    .droppable({
      //might want to change accept to be more specific
      accept: '.'+type+'Card',
      drop: cardDrop
    }))

}

function cardDrop(event, ui){
  $(this).append($(ui.draggable).clone());
  $(this).droppable( 'disable' );

  var scrollElement=$(this).parent();
  scrollElement.animatescroll();
  var off = $(this).offset();
  activeCard=$(this).children('div');
  activeCardSlot=activeCard.parent().prop('id');
  activeCardMeta=(activeCardSlot.split('_'));
  index=activeCardMeta[2]
  $(this).find('.ui-draggable')
    .offset({ top:off.top, left:off.left})
    .addClass('dropped')
    .attr('id',activeTimePeriod+"_"+draggedID+"_"+index)
    .on('click', DroppedCardClickFunction);
  //remove click function from slot which is now under card
  $(this).unbind();

  //highlight next drop zone and change card list
  $(this).removeClass('activeDrop').addClass('droppedOn')
  nextCardSlot('vertical')
  //open value panel if input needed and don't navigate to next slot
  if ($(this).hasClass('inputSlot')||$(this).hasClass('outputSlot')){
    console.log(activeCard.prop('id').split('_'))
    if(activeCard.prop('id').split('_')[1]!='none'){
      console.log('not')
      openValuesSideMenu()
    }
    $('.changeCard').hide()
  }

}

function nextCardSlot(direction){
  console.log(activeCardMeta);
  activeType=activeCardMeta[1].replace('Slot','');
  activeCardIndex=parseInt(activeCardMeta[2]);
  activeTimePeriod=activeCardMeta[0].replace('T','');
  console.log('type: '+activeType);
  console.log('time period: '+activeTimePeriod);
  console.log('index: '+activeCardIndex);
  $('.slotCard').removeClass('activeDrop')
  //horizontal navigation after add card
  if(direction=='horizontal'){
    var nextIndex=parseInt(activeCardMeta[2])+1;
    $('#T'+activeTimePeriod+'_'+activeType+'Slot'+'_'+nextIndex).addClass('activeDrop')
    showNextCards(activeType)
  }
  //vertical navigation after card drop
  if(direction=='vertical'){
    //T2_labourSlot_0
    if(activeType!='consumed'){
      var nextType=slotTypes[slotTypesIndex[activeType]+1]
      $('#T'+activeTimePeriod+'_'+nextType+'Slot'+'_'+0).addClass('activeDrop')
      showNextCards(nextType)
    }
  }

}

function showNextCards(Type){
  $('.cardHolder').hide();
  $('#'+Type+'Cards').show()
  $("#cardHolders h3").html(Type)
}

function DroppedCardClickFunction(){
  activeCard=$(this);
  activeCardSlot=activeCard.parent().prop('id');
  activeCardMeta=(activeCardSlot.split('_'));
  activeType=activeCardMeta[1].replace('Slot','')
  console.log(activeCardMeta)
  openValuesSideMenu()
}

function openValuesSideMenu(){
  $('.changeCard').show()
  console.log('active card id:')
  console.log(jsonValues)
  console.log(activeCard.prop('id'))
  $('#quantity').val('')
  $('#value').val('')
  if(jsonValues[activeCard.prop('id')]!=undefined){
    $('#quantity').val(jsonValues[activeCard.prop('id')].Quantity)
    $('#value').val(jsonValues[activeCard.prop('id')].Value)
  }
  $('.values').hide()
  $('#values-panel h2').text(activeCard.prop('id').split('_')[1])
  console.log(activeType)
  if(activeType == 'input' || activeType=='output'){
    $('.values').show()
  }
  $("#values-panel" ).panel("open");
}

function CardSlotClickFunction(){
  activeCardSlot=$(this).prop('id');
  console.log(activeCardSlot)
  activeCardMeta=(activeCardSlot.split('_'));
  $('.cardHolder').hide();
  $('.slotCard').removeClass('activeDrop');
  $(this).addClass('activeDrop');
  showNextCards($(this).parent().prop('id').replace('Slots','').replace(/\d+/g, ''))
  //expand current section and contract others
  $('.expanded').addClass('contracted').removeClass('expanded');
  $(this).parent().parent().parent().addClass('expanded').removeClass('contracted');
  //update active period and type to set id on future card drop
  activeTimePeriod=$(this).parent().prop('id').replace(/\D/g,'');
  activeType=$(this).parent().prop('id').replace('Slots','').replace(/\d+/g, '')
}

function makeFooterScroller(){
  //initiate footer slidier
  var frame = $('.frame');
  frame.sly({
    horizontal: 1,
    itemNav: 'basic',
    smart: 0,
    scrollBy: 1,
    mouseDragging: 1,
    swingSpeed: 0.2,
    dragHandle: 1,
    clickBar: 1,
    elasticBounds: 1,
    speed: 600,
    startAt: 0,
  });
}



var allData=
  [{"Type":"activity","Name":"apply fertiliser","Image":"images/activity/apply-fertiliser.png","ID":"apply-fertiliser"},
    {"Type":"activity","Name":"apply pesticide","Image":"images/activity/apply-pesticide.png","ID":"apply-pesticide"},
    {"Type":"activity","Name":"bagging","Image":"images/activity/bagging.png","ID":"bagging"},
    {"Type":"activity","Name":"compost manure making","Image":"images/activity/compost-manure-making.png","ID":"compost-manure-making"},
    {"Type":"activity","Name":"harvesting","Image":"images/activity/harvesting.png","ID":"harvesting"},
    {"Type":"activity","Name":"land clearing","Image":"images/activity/land-clearing.png","ID":"land-clearing"},
    {"Type":"activity","Name":"marketing and selling","Image":"images/activity/marketing-and-selling.png","ID":"marketing-and-selling"},
    {"Type":"activity","Name":"mulching","Image":"images/activity/mulching.png","ID":"mulching"},
    {"Type":"activity","Name":"none","Image":"images/activity/none.png","ID":"none"},
    {"Type":"activity","Name":"other","Image":"images/activity/other.png","ID":"other"},
    {"Type":"activity","Name":"ploughing","Image":"images/activity/ploughing.png","ID":"ploughing"},
    {"Type":"activity","Name":"shelling","Image":"images/activity/shelling.png","ID":"shelling"},
    {"Type":"activity","Name":"sowing","Image":"images/activity/sowing.png","ID":"sowing"},
    {"Type":"activity","Name":"storage","Image":"images/activity/storage.png","ID":"storage"},
    {"Type":"activity","Name":"threshing","Image":"images/activity/threshing.png","ID":"threshing"},
    {"Type":"activity","Name":"transport","Image":"images/activity/transport.png","ID":"transport"},
    {"Type":"activity","Name":"watering","Image":"images/activity/watering.png","ID":"watering"},
    {"Type":"activity","Name":"weeding","Image":"images/activity/weeding.png","ID":"weeding"},
    {"Type":"consumed","Name":"crop","Image":"images/consumed/crop.png","ID":"crop"},
    {"Type":"consumed","Name":"manure for compost","Image":"images/consumed/manure-for-compost.png","ID":"manure-for-compost"},
    {"Type":"consumed","Name":"none","Image":"images/consumed/none.png","ID":"none"},
    {"Type":"consumed","Name":"other","Image":"images/consumed/other.png","ID":"other"},
    {"Type":"consumed","Name":"wood","Image":"images/consumed/wood.png","ID":"wood"},
    {"Type":"input","Name":"bags","Image":"images/input/bags.png","ID":"bags"},
    {"Type":"input","Name":"chemicals","Image":"images/input/chemicals.png","ID":"chemicals"},
    {"Type":"input","Name":"fertiliser","Image":"images/input/fertiliser.png","ID":"fertiliser"},
    {"Type":"input","Name":"hire ox cart","Image":"images/input/hire-ox-cart.png","ID":"hire-ox-cart"},
    {"Type":"input","Name":"labour - paid","Image":"images/input/labour---paid.png","ID":"labour---paid"},
    {"Type":"input","Name":"manure sacks","Image":"images/input/manure-sacks.png","ID":"manure-sacks"},
    {"Type":"input","Name":"manure wheelbarrows","Image":"images/input/manure-wheelbarrows.png","ID":"manure-wheelbarrows"},
    {"Type":"input","Name":"none","Image":"images/input/none.png","ID":"none"},
    {"Type":"input","Name":"other","Image":"images/input/other.png","ID":"other"},
    {"Type":"input","Name":"pot for storage","Image":"images/input/pot-for-storage.png","ID":"pot-for-storage"},
    {"Type":"input","Name":"protective equipment","Image":"images/input/protective-equipment.png","ID":"protective-equipment"},
    {"Type":"input","Name":"seeds","Image":"images/input/seeds.png","ID":"seeds"},
    {"Type":"input","Name":"sheller hire","Image":"images/input/sheller-hire.png","ID":"sheller-hire"},
    {"Type":"input","Name":"tools","Image":"images/input/tools.png","ID":"tools"},
    {"Type":"input","Name":"tractor hire","Image":"images/input/tractor-hire.png","ID":"tractor-hire"},
    {"Type":"input","Name":"transportation hire","Image":"images/input/transportation-hire.png","ID":"transportation-hire"},
    {"Type":"input","Name":"wood","Image":"images/input/wood.png","ID":"wood"},
    {"Type":"labour","Name":"family labour","Image":"images/labour/family-labour.png","ID":"family-labour"},
    {"Type":"labour","Name":"none","Image":"images/labour/none.png","ID":"none"},
    {"Type":"output","Name":"crop","Image":"images/output/crop.png","ID":"crop"},
    {"Type":"output","Name":"manure for compost","Image":"images/output/manure-for-compost.png","ID":"manure-for-compost"},
    {"Type":"output","Name":"money","Image":"images/output/money.png","ID":"money"},
    {"Type":"output","Name":"none","Image":"images/output/none.png","ID":"none"},
    {"Type":"output","Name":"other","Image":"images/output/other.png","ID":"other"},
    {"Type":"output","Name":"wood","Image":"images/output/wood.png","ID":"wood"}]
