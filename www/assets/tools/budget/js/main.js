var deviceWidth, deviceHeight

$( document ).on( "pageinit", "#planner", function( event ) {
	deviceWidth=$(document).width()
  deviceHeight=$(document).height()
	$('#plannerTemplate').hide()
	$('#cardHolders').css('width',deviceWidth-40).hide()
	$('#menu-panel').panel("open")
	$('#menuPanelClose').on('click',function(){
		menuClose()
	})
	$('#createNew').on('click',function(){
		menuClose()
		createNewDocument()
	})
	$('#save').on('click',function(){
		saveLayout()
	})
	$('#print').on('click',function(){
		printToPdf()
	})
});

$(document).on("pagebeforeshow","#planner",function(){
	//assign click event listeners
	$('.dropped').on('click',function(i,v){
		activeCard=$(this);
	})
})

//function to load blank doc template - currently not working
function menuClose(){
	//$('#plannerTemplate').replaceWith(blankMarkup);
	$('#menu-panel').panel("close")

		$('#introText').hide()
		$('#cardHolders').show()
}

function printToPdf(){
	var element=document.getElementById('mainSection')
	console.log(element)
	html2canvas(element, {
    onrendered: function(canvas) {
        document.body.appendChild(canvas);
		$('#plannerTemplate').append(canvas)
		var img=canvas.toDataURL()
		window.open(img)
    }
});
}
