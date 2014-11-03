
$(document).ready( function(){
	
	document.getElementById("start").addEventListener("click" ,function(){
		u_name = document.getElementById("username").value ;
		p_word = document.getElementById("password").value ; 
		item_url = document.getElementById("url_addr").value ; 
		your_size = document.getElementById("your_size").value ; 
		your_color = document.getElementById("your_color").value ; 
		start_time = document.getElementById("start_time").value ; 
		buy_type = $("#buy_type").find(":selected").val() ;
		
		var BGPage = chrome.extension.getBackgroundPage() ; 
		BGPage.upload(u_name,p_word,item_url,your_size,your_color , start_time , buy_type ) ; 
	});
});