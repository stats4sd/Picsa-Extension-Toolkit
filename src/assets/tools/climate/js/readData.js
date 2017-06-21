var mydata=[]
var i=0
var j=0
var headers=[]
var availableData=[
{"SiteName":"Babile","Latitude":10.519819,"Longitude":-2.835273,"FilePath":"datasets/new/Babile.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Bole","Latitude":9.0333,"Longitude":-2.4833,"FilePath":"datasets/new/Bole.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Damango","Latitude":9.0833,"Longitude":-1.8167,"FilePath":"datasets/new/Damango.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Navrongo","Latitude":10.894025,"Longitude":-1.092147,"FilePath":"datasets/new/Navrongo.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Salaga","Latitude":8.552529,"Longitude":-0.518694,"FilePath":"datasets/new/Salaga.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Vea","Latitude":10.866667,"Longitude":-0.85,"FilePath":"datasets/new/Vea.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Wa","Latitude":10.060074,"Longitude":-2.509891,"FilePath":"datasets/new/Wa.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Walewale","Latitude":10.35,"Longitude":-0.8,"FilePath":"datasets/new/Walewale.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Yendi","Latitude":9.4450,"Longitude":-0.0093,"FilePath":"datasets/new/Yendi.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
{"SiteName":"Zuarungu","Latitude":10.7961,"Longitude":-0.8080,"FilePath":"datasets/new/Zuarungu.csv"
,"AvailableData":["SeasonRainfall", "LengthOfSeason", "SeasonStart", "SeasonEnd"/*, "Temperature"*/]},
]

function Init(){
	$('#chart2').hide();
	$.each(availableData,function(index,value){
		readData(value.FilePath,value.SiteName)
		d3.csv(value.FilePath, function(error, data) {
			//save headers for each data set
  			headers.push({
				"Site Name":value["Site Name"],
				"Headers":d3.keys(data[0])
			})
		});
		$('#sites').append('<option value='+value.SiteName+'>'+value.SiteName+'</option>')
		})
		//$('#sites').val('Bole').attr('selected', true).siblings('option').removeAttr('selected');
		//$('#sites').selectmenu( "refresh", true )
}

function readData(path,siteName){
activeSite=siteName
		d3.csv(path, function(d) {


  return {
   Year: new Date(+d.Year, 0, 1),
   Site: siteName,
   TotalRainfall: +d['Total Rain'],
   SeasonRainfall: +d['Total Rainfall SeasonA'],
   SeasonStart: +d['StartSeason_A'],
   SeasonEnd: +d['EndSeason_A'],
   LengthOfSeason: +d['Length_of_Season_A'],
   Temperature_min: +d['Temp_min'],
   Temperature_max: +d['Temp_max']

    //year: new Date(+d.yyyy, 0, 1), // convert "Year" column to Date
	//date: new Date(+d.yyyy, d.mm, 1),
  };

}, function(error, rows) {
  mydata.push({
	  site:siteName,
	  data:rows
  })
});
}

function dateFromDay(year, day){
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
}
