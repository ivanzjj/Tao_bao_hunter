function sleep( time_out ){
	var s = new Date().getTime() ; 
	while( true ){
		if( new Date().getTime() - s >= time_out )	break ; 
	}
}

$(document).ready( function(){
	var size_li , color_li ; 
	
	if( size != "" ){
		sizeUL = document.getElementsByClassName("J_TSaleProp tb-clearfix");
		if( sizeUL.length == 0 )
			sizeUL = document.getElementsByClassName("tm-clear J_TSaleProp");
		if( sizeUL.length == 2 ){				
			if(	sizeUL[0].className.replace(/^\s+|\s+$/g, '').split(" ").length == 2 )
				sizeUL = sizeUL[0] ;  
			else	
				sizeUL = sizeUL[1] ; 
		}
		else
			sizeUL = sizeUL[0] ;
		size_li = sizeUL.getElementsByTagName("li") ;
		for( var i=0;i<size_li.length;i++){
			if( size_li[i].className == "tb-selected" )
				size_li[i].className = "" ; 
		}
		size_li = size_li[ size ] ; 
		
	}
	if( color != "" ){
		colorUL = document.getElementsByClassName("J_TSaleProp tb-clearfix tb-img") ;
		if( colorUL.length == 0 )
			colorUL = document.getElementsByClassName("tm-clear J_TSaleProp tb-img") ;
		colorUL = colorUL[0] ; 
		color_li = colorUL.getElementsByTagName("li") ; 
		for( var i = 0 ; i < color_li.length ; i++ ){
			if( color_li[i].className == "tb-selected" ){
				color_li[i].className = ""  ;
			}
		}
		color_li = color_li[ color ] ; 
	}
	buy = document.getElementById("J_LinkBuy") ;
	if( buy == null ) 
		buy = document.getElementsByClassName("J_LinkBuy tb-iconfont")[0] ;		
	
	var intervalID = setInterval(function(){
		if( size_li.className=="tb-selected" && color_li.className == "tb-selected" ){
			buy.click() ; 
			clearInterval(intervalID);
		}
		else{
			if( size_li.className!="tb-selected" ){
				size_li.children[0].click() ; 
			}
			if( color_li.className!="tb-selected" ){
				color_li.children[0].click() ; 
			}
		}
	}, 200);
} );

