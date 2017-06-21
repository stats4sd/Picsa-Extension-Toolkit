var allValues=[]
var jsonValues={}
var activeCardType
var activeCardItem
var runningTotal
var activeTimePeriod

$(document).ready(function() {
$('#updateValues').click(function(){
  var activeID=(activeCard.prop('id'))
  var cardText=activeID.split('_')[1]
  //activeType=activeCard.parent().prop('id').split('_')[1].replace('Slot','')
  console.log(activeType)
  console.log(cardText)
	var Quantity=$('#quantity').val()
	var Value=$('#value').val()
  jsonValues[activeID]={
    "Time Period":activeTimePeriod,
    "Type":activeType,
    "Item":cardText,
    "Quantity":Quantity,
    "Value":Value
***REMOVED***
	allValues.push({
		"Time Period":activeTimePeriod,
		"Type":activeType,
		"Item":cardText,
		"Quantity":Quantity,
		"Value":Value
	})
	console.log(jsonValues);
  activeCard.empty()
  activeCard.append(cardText)
  activeCard.append("<div class='multiple'>GH₵ "+Quantity*Value+"</div>")
   // .append("<div class='multiple'>GH₵ "+Quantity*Value+"</div>")
   // .append("<div class='cashIcons'>GH₵ "+Quantity*Value+"</div>")
	calculateBudget()
	$( "#values-panel" ).panel("close");
  nextCardSlot('vertical')
})

})

function removeValue(Type,Item){
	$.each(allValues,function(index,value,activeTimePeriod){
		if(value.Type==Type && value.Item==Item && value["Time Period"]==timePeriod){
			removeIndex = index;
			allValues.splice(removeIndex,1);
			//break
			return false
		}
		calculateBudget()
	})
	//still need to prevent removal of wrong values in case of duplicates, e.g. person has put in seed box twice
	//likely solution to hide card from footer when dropped and replace when removed
}

//can improve on when know how to completely remove json entry
function removeJson(cardID){
  console.log(cardID)
  console.log(jsonValues)
  console.log(jsonValues[cardID])
  if(jsonValues[cardID]!=undefined){delete jsonValues[cardID]}
  console.log(jsonValues)
  calculateBudget()
}

function calculateBudget(){
	//runningTotal=0
	//var inputTotal=0
	//var outputTotal=0
	//var labourTotal=0
	//$.each(allValues,function(index,value){
	//	if(value.Type=="input"){
	//		var temp=value.Quantity*value.Value
	//		inputTotal=inputTotal+temp}
	//	if(value.Type=="output"){
	//		temp=value.Quantity*value.Value
	//		outputTotal=outputTotal+temp}
	//	runningTotal=outputTotal-inputTotal
  inputTotal=0
  outputTotal=0
  $.each(jsonValues,function(i,v){
    console.log(v)
    if(v.Type=='input'){
      inputTotal=inputTotal+ v.Quantity* v.Value
  ***REMOVED***
    if(v.Type=='output'){
      outputTotal=outputTotal+ v.Quantity* v.Value
  ***REMOVED***
***REMOVED***)
 runningTotal=outputTotal-inputTotal
  console.log('running total: '+runningTotal)

	$('#totalOutput').text('Total Output: '+outputTotal)
	$('#totalInput').text('Total Input: '+inputTotal)
	$('#total').text('Balance: '+runningTotal)
}
