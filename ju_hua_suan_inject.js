$(document).ready( function(){
	is_start = document.getElementsByClassName("buyaction J_BuySubmit") ;
	if( is_start.length == 0 ){
		location.reload() ;
	}
	else{
		is_start[0].click() ; 
	}
});