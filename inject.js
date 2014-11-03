$(document).ready( function(){
	var intervalID = setInterval(function(){
			submit_button = document.getElementById("J_Go") ; 
			if( submit_button != null ){
				submit_button.click() ; 
				clearInterval(intervalID);
			}
		}, 100);
});