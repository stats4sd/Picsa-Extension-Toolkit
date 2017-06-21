var activeSite, activeChartType, chartType=1; //1 has numerical y, 2 has date y
var activeSiteData=[];

$(window).resize(function() {
		app.resizeMap();
		resizeChartDiv();
	});

//initial page load functions
$(document).on("pageinit","#historicClimate",function(e){
	//open side panel
	$( "#right-panel" ).panel("open");
	$('.filter').hide();
	$('#sidePanelClose').attr("disabled",false).hide();
	$('#graphSelect').hide();
	$('#seasons').hide();
	//using site dropdown, remove current graphs and plot rainfall graph of selected site
	$( "#sites").change(function() {
		activeSite=this.value;
		changeSiteFunction(activeSite)
	});
	 $('.season').click(function(){
		 var suffix=this.id
		 seasonClickFunction(suffix)
	 })
	 $('#sidePanelClose').click(function(){
		$( "#right-panel" ).panel( "close" );
	});
	})

//function to load clickable images relating to the available data columns used to create graphs
function loadAvailableSummaries(siteName){
	$.each(availableData,function(index, value){
		//load available summaries if site name matches expected
		if (value.SiteName==siteName){
			console.log(siteName)
			console.log(value)
			$.each((value["AvailableData"]),function(i, v){
			console.log(v)
			$('<img/>')
			.appendTo($('#filterImages'))
			.attr('id',v)
			.prop('src', 'images/'+v+'.png')
			.on('click', imageFilterClick)
			//.css('background-image', 'url(images/'+value+'.png)')
		})
		}
	})
}

function changeSiteFunction(activeSite){
	//clear old filter image list and add new - not needed now but useful if different sites had different data available
	$('#filterImages').empty();
	$('#graphSelect').show();
	$('#sidePanelClose').hide();
	$('#months').hide();
	$('#seasons').hide();
	activeSiteData=getSiteData(activeSite)
	$('#chartTitle').html('<strong>'+activeSite+'</strong>')
	chartFromMydata(activeSiteData);
	loaded=''
	loaded2=''
	chart.unload()
	chart2.unload()
	$('img').removeClass('selected');
	//load relevant images
	loadAvailableSummaries(activeSite)
	$(document).scrollTop($(document).height());
}

//function to run when graph images are clicked on
function imageFilterClick(){
	$(document).scrollTop($(document).height());
  $('#lineTool').val('');
	//set or remove selected classes
	if($(this).hasClass('selected')){}
	else{
	$('img').removeClass('selected');
	$(this).addClass('selected');
	activeChartType=this.id
	chartType=1
	if(this.id=="SeasonStart"){chartType=2}
	if(this.id=="SeasonEnd"){chartType=2}
	//load chart
	var dataset=activeChartType
	if(chartType==1){loadData1(dataset)}
	if(chartType==2){loadData2(dataset)}
}
}

//applied when either month or season filter clicked - suffix taken from id of image
function seasonClickFunction(suffix){
	console.log(suffix)
	$('#sidePanelClose').show();
	//choose dataset by combining image id with filter suffix (if not 'All')
	var dataset =activeChartType
	if(suffix!="All"){dataset =activeChartType+'_'+suffix}
	if (chartType==1){loadData1(dataset)}
	if (chartType==2){loadData2(dataset)}
	$(document).scrollTop($(document).height());
}

function getSiteData(Site){
	var temp=[]
	$.each(mydata, function(index, value){
		if (value.site==Site) {
			//console.log(value.data)
			temp=value.data

			}
	})
	return temp
}
