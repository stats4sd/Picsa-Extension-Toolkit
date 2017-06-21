var lineValue;
$(document).ready(function() {
$( "#lineTool").change(function() {
	lineValue=this.value;
	graphLineTool(lineValue)
});
 $('#toolPanelClose').click(function(){
	//$( "#tool-panel" ).panel( "close" );
	graphLineTool(lineValue)
});

})


function graphLineTool(value) {
  //determine whether chart type 1 or 2 is being used
  var lineData = ['lineTool'];
  for (var i = 0; i < activeSiteData.length; i++) {
    lineData.push(value)
***REMOVED***
  chart.load({
    columns: [lineData]
***REMOVED***);
  var pointsAbove = 0;
  var pointsBelow = 0;

  $.each(activeSiteData, function (i, v) {
    var currentValue = v[activeDataName];
    //only use numbers which exist, i.e. exclude NaN
    if (!isNaN(currentValue)) {
      if (v[activeDataName] > value) {
        pointsAbove = pointsAbove + 1
    ***REMOVED***
      else pointsBelow = pointsBelow + 1
  ***REMOVED***
***REMOVED***);
  //calculate probabilities
  var probability = (pointsAbove / (pointsAbove + pointsBelow) * 100).toPrecision(2);
  var probabilityRev = (pointsBelow/(pointsAbove+pointsBelow)*100).toPrecision(2);
  console.log('probability: '+probability)
  console.log('revProbability: '+probabilityRev)
  var oneIn = 0;
  var oneInComp = 0;
  if (pointsAbove != 0) {
    oneIn = Math.round((pointsBelow + pointsAbove) / (pointsAbove));
***REMOVED***
  if (pointsBelow != 0) {
    oneInRev = Math.round((pointsBelow + pointsAbove) / (pointsBelow))
***REMOVED***
  console.log('one in: '+oneIn);
  console.log('one in Rev: '+oneInRev)
  if (pointsAbove == 0) {
    probability = 0
***REMOVED***
  if (pointsBelow == 0) {
    probability = 100
***REMOVED***
  $('#lineToolSummary').empty().html(
    'Points above: ' + pointsAbove + '<br>Points below: ' + pointsBelow
  ).append(
    '<p><b>' + probability + '%</b> of points above</p>'
  );
  $('#lineToolPicRepRight').empty();
  $('#lineToolPicRepLeft').empty();
  //append images based on the one in and one in comp probabilities. Only if not null.
  if (pointsAbove != 0 && pointsBelow != 0) {
  if (pointsBelow >= pointsAbove) {
    $('#lineToolSummary').append(
      '<p>this is about <b>1 in ' + oneIn + '</b></p>'
    );
    $('#lineToolPicRepLeft').append("<div class='lineToolPicRepLeft'></div>");
    for (i = 1; i < oneIn; i++) {
      $('#lineToolPicRepRight').append("<div class='lineToolPicRepRight'></div>")
  ***REMOVED***
***REMOVED***
  else {
    $('#lineToolSummary').append(
      '<p>this is about <b>' + (oneInRev-1) + ' in ' + (oneInRev) + '</b></p>'
    );
    for (i = 1; i < oneInRev; i++) {
      $('#lineToolPicRepLeft').append("<div class='lineToolPicRepLeft'></div>")
  ***REMOVED***
      $('#lineToolPicRepRight').append("<div class='lineToolPicRepRight'></div>")
***REMOVED***
}
}

function terciles(){

}
