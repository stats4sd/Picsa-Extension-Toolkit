 var map
 var currentLocation=[]
 var dataLoaded=false
 var stationDistances=[]
 
 $(document).on("pageshow","#sitePicker",function(){ // When entering page
	$('#map-canvas').width($(document).width())	
	$('#map-canvas').height($(document).height()-130)	
	//fired to resize map and re-centre for use in div
  L.Util.requestAnimFrame(map.invalidateSize,map,!1,map._container)
  if(currentLocation.length==0){map.locate();console.log("locating")}
  if(dataLoaded==false){loadMapData()}
  map.panTo([8.2, -1])
	});

$(document).on("pageshow","#historicClimate",function(){ // When entering page
	$( "#right-panel" ).panel("open");
});

function onLocationFound(e){
	currentLocation=[e.latitude,e.longitude]
	L.circleMarker(currentLocation,{
		color:'red',
		fillColor:'red'
	}).addTo(map)
	$('#CurrentLocation').html("Location Found")
	//calculate distances
	$.each(availableData,function(index,value){
		var distance=L.latLng(value.Latitude,value.Longitude).distanceTo(currentLocation)	
		stationDistances.push({'Site Name':value["SiteName"],'distance':distance, 'lat':value.Latitude,'long':value.Longitude})
		stationDistances.sort(function(a, b) {
   		 return parseFloat(a.distance) - parseFloat(b.distance);
		});
	})
	$('#CurrentLocation').append("<br>Nearest station is "+stationDistances[0]["Site Name"])
	map.panTo([stationDistances[0].lat,stationDistances[0].long]);
	console.log(stationDistances)
	L.circleMarker([stationDistances[0].lat,stationDistances[0].long]).addTo(map)
	//map.panTo([e.latitude,e.longitude])
}
function loadMapData(){
	dataLoaded=true
	//add markers for each station
	$.each(availableData,function(index,value){
		console.log(value)
		L.marker([value.Latitude,value.Longitude],{title:value["SiteName"]})
			.addTo(map)
			.bindPopup("<strong>"+value["SiteName"]+"</strong><br>Selected",
				{classname:'helloChris',
				 'closeButton':false}
				)
			
	})
	
}

function onMapClick(e) {
	console.log(e)
		map.panTo([e.latlng.lat,e.latlng.lng])
		}
		
function onPopupOpen(e){
	var temp=e.popup["_content"]
	console.log(temp)
	console.log(temp.indexOf(">"));
	activeSite=temp.substr(temp.indexOf("<strong>")+8,temp.indexOf("<br>")-17)
	console.log("site is "+activeSite)
	$("#sites")
	.val(activeSite)
	.parent().find('span').text(activeSite)
	changeSiteFunction(activeSite)
	$('#graphSelect').show();
	$('.leaflet-marker-pane img').removeClass('selectedStation')
	$('img[title="'+activeSite+'"]').addClass('selectedStation')
	}


var app = {
    // Application Constructor
    initialize: function() {
        //this.bindEvents();	
		app.resizeMap();
		
		  map = L.map('map-canvas',{
		  center:[8.2, -1],
		  zoom:7,
		  //dragging: false,
		***REMOVED***);
		L.tileLayer('images/mapTiles/{z}/{x}/{y}.png', {
			maxZoom: 8,
			minZoom: 0,
		}).addTo(map);

		//map.on('click', onMapClick);
		map.on('locationfound',onLocationFound);
		//map.on('load',onLoad);
		map.on('popupopen',onPopupOpen);
		//map.on('load',function(){console.log("helloe")})
		//map.whenReady(function(){console.log("loaded")})
		//map.fitBounds([],{
			//paddingTopLeft:[15,15]})
		
  ***REMOVED***,
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
  /*  bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
  ***REMOVED***,
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
  ***REMOVED***,
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
  ***REMOVED***,*/
	resizeMap: function() {
		 $("#map-canvas").height(Math.max(100,$(window).height()-190));
		 $("#map-canvas").width(Math.max(100,$(window).width()-30));
	}
	
	
	
***REMOVED***
	
