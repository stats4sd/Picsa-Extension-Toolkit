var chart
var chart2
var activeDataName
var loaded=''
var loaded2=''
var yLabel

//chart.regions.remove();
//chart.regions.add(
//  {axis: 'y', start: 000, end: 600, class: 'regionY1'}



function chartFromMydata(data){
  ///var ticks = Math.floor(data.length/12)+1
  //var ticks=Math.floor((data.length)/5)-1
  chart=c3.generate({
    bindto: '#chart',
    padding:{
      right: 20
  ***REMOVED***,
    data: {
      json: data,
      hide: true,
      keys: {
        x: 'Year',
        value: ['blank'],
    ***REMOVED***,
      classes: {lineTool: 'lineTool'},
      colors: seriesColors
  ***REMOVED***,
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          fit: false,
          format: '%Y',
      ***REMOVED***,
        label: {
          text: 'Year',
          position: 'outer-center'
      ***REMOVED***,
    ***REMOVED***,
      y: {
        label: {
          text: 'y-axis',
          position: 'outer-middle'
      ***REMOVED***,

    ***REMOVED***
  ***REMOVED***,
    grid: {
      x: {show: true},
      y: {show: true}
  ***REMOVED***,
    tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
       // console.log(d)
        var units='mm';
        var rainfallTooltip;
        if(d[0].id=='LengthOfSeason'){units='days'}
        //add different tooltip for null years
        if(d[0].value==null){
          rainfallTooltip='<div style="width: 140px;background-color: #fdff7a;font-size:larger;border:2px solid black>'
            +'No data available</div>'
      ***REMOVED***
        else{
          rainfallTooltip='<div style="width: 140px;background-color: #fdff7a;font-size: larger;border:border:2px solid black">'
            +'<strong>'+ d[0].x.getFullYear()+'</strong><br><br>'
            +Math.round(d[0].value)+' '+units+' of rain</div>'
      ***REMOVED***
        return rainfallTooltip
    ***REMOVED***
  ***REMOVED***,
    //subchart: {show: true},
    //point: {show: false},
    point: {
      show: true,
      r: function(d){
        //d is the data object passed, containing id, index, value, x
        if(d.id=="lineTool"){return 0}
        else {return 4.5}
    ***REMOVED***,
      focus: {
        expand: {
          r: 8
      ***REMOVED***
    ***REMOVED***,
      //select: {
      //  r: 30
      //}
  ***REMOVED***,
    //custom function when legend clicked
    legend:{item:{onclick: function () {}}
  ***REMOVED***
***REMOVED***);

  chart2=c3.generate({
    bindto: '#chart2',
    padding:{
      right: 20
  ***REMOVED***,
    data: {
      json: data,
      keys: {
        x: 'Year',
        value: ['AmountApril'],
    ***REMOVED***,
      colors: seriesColors
  ***REMOVED***,
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          fit: false,
          format: '%Y',
      ***REMOVED***,
        label: {
          text: 'Year',
          position: 'outer-center'
      ***REMOVED***,
    ***REMOVED***,

      y: {
        label: {
          text: 'Date',
          position: 'outer-middle'
      ***REMOVED***,
        tick: {
          format: function(d){
            var format = d3.time.format("%b-%d");
            return format(new Date(2011, 0, d));
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***},
    grid: {
      x: {show: true},
      y: {show: true}
  ***REMOVED***,
    //subchart: {show: true},
    //custom function when legend clicked
    legend:{item:{onclick: function () {}}
  ***REMOVED***,
    point:{
      r: function(d){
        //d is the data object passed, containing id, index, value, x
        if(d.id=="lineTool"){return 0}
        else {return 4.5}
    ***REMOVED***,
      focus: {
        expand: {
          r: 8
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***)
}


function resizeChartDiv(){
  var windowHeight=($(window).height())
  $("#chart").height(Math.max(400,windowHeight-210));
  $("#chart2").height(Math.max(400,windowHeight-210));
}



function loadData1(keyValue){
  activeDataName=keyValue;
  console.log(keyValue);
  //update axis labels
  var yLabel='y-axis';
  if(keyValue=='SeasonRainfall'){yLabel='Total Rainfall (mm)'}
  if(keyValue=='LengthOfSeason'){yLabel='Number of Days'}
  chart.axis.labels({y: yLabel});
  if(keyValue!=loaded){
    chart.load({
      json: activeSiteData,
      keys: {
        value: [keyValue],
    ***REMOVED***,
      unload:[loaded,"lineTool"]
  ***REMOVED***);
    loaded=keyValue
***REMOVED***
  console.log(yLabel)
  $('#chart2').hide()
  $('#chart').show()
  $('.chartTools').show()
}

function loadData2(keyValue){
  console.log(activeSiteData)
  activeDataName=keyValue
  if(keyValue!=loaded2){
    chart2.load({
      json: activeSiteData,
      keys: {
        value: [keyValue],
    ***REMOVED***,
      unload:[loaded2]
  ***REMOVED***);
    loaded2=keyValue
***REMOVED***
  $('#chart').hide()
  $('#chart2').show()
  $('.chartTools').hide()
}

function unloadData(keyValue){
  chart.unload({
    ids:keyValue
***REMOVED***);
}

function unloadData2(keyValue){
  chart2.unload({
    ids:keyValue
***REMOVED***);
}


var seriesColors={
  SeasonRainfall: '#377eb8',
  LengthOfSeason: '#e41a1c',
  SeasonStart: '#984ea3',
  SeasonEnd: '#4daf4a',

}
