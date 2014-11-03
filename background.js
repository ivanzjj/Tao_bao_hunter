function get_now(){
	dt = new Date() ;
	hour = parseInt( dt.getHours() ) ;
	min = parseInt( dt.getMinutes() ) ;
	sec = parseInt( dt.getSeconds() ) ;
	m_sec = parseInt( dt.getMilliseconds() ) ;
	now = ( (hour*60 + min)*60 + sec ) * 1000 + m_sec ; 
	return now ;
}

function wait_for_time( target_time ){
	var is_wait = 0 ; 
	while( true ){
		diff = target_time - get_now() ; 
		if( diff <= 0 ) 	return is_wait ;
		is_wait = 1 ; 
	}
} 

upload = function( u_name ,p_word,item_url ,your_size, your_color , start_time , buy_type ){
	buy_taobao = /buy.taobao.com\/auction\/buy_now.jhtml/;
	buy_tmall = /buy.tmall.com\/order\/confirm/ ;
	
	reg_i_taobao = /i.taobao.com\/my_taobao/ ; 
	pay_taobao = /alipay.com\// ;
	tmall_item = /detail.tmall.com\/item.htm/ ; 
	taobao_item = /item.taobao.com\/item.htm/ ;
	login_url = "https://login.taobao.com/member/login.jhtml" ; 
	last_go = "http://buyer.trade.taobao.com/trade/itemlist/list_bought_items.htm" ; 
	list = start_time.split(":") ; 
	hour = parseInt( list[0] ) ;
	min = parseInt( list[1] ) ; 
	target_time = ((hour*60+min)*60+0)*1000 ; // milli sec 

	var flag = 0 ; 
	
	chrome.tabs.create( {url : login_url }, function(tab){
		var tabID = tab.id ; 
		chrome.tabs.onUpdated.addListener( function( tabID , changeInfo , tab1 ){
			if( changeInfo.status=="loading" && String(tab1.url)==String(login_url) ){
				chrome.tabs.executeScript(tab1.id, {
					code: 'var username = "' + u_name + '";var pwd="' + p_word + '";'
				}, function() {
					chrome.tabs.executeScript(tab1.id, {file: 'login_inject.js'} );
				});
			}
			else if(changeInfo.status=="loading" && reg_i_taobao.test( tab1.url ) ){
				chrome.tabs.executeScript( tab1.id , {code : 'window.location.href="' + item_url + '"'}) ;
			}
			else if(changeInfo.status=="loading" && String(tab1.url)==String(item_url) && buy_type==1 ){
				if( wait_for_time( target_time ) == 1 ){
					chrome.tabs.update({url:item_url}) ; 
				} 
				else {
					chrome.tabs.executeScript( tab1.id , {
						file : "ju_hua_suan_inject.js" 
					} );
					flag = 1 ;
				}
			}
			else if(changeInfo.status=="loading" && flag==1 && (tmall_item.test(tab1.url) || taobao_item.test(tab1.url) ) ){
				chrome.tabs.executeScript(tab1.id, {
					code: 'var size = "' + your_size + '";var color="' + your_color + '";' 
				}, function() {
					chrome.tabs.executeScript(tab1.id, {file: 'buy_inject.js'} );
				});
			}
			else if(changeInfo.status=="loading" && String(tab1.url)==String(item_url) && buy_type==0 ){
				if( wait_for_time( target_time ) == 1 ){
					chrome.tabs.update( {url:item_url } ) ;
				}
				else{
					chrome.tabs.executeScript(tab1.id, {
						code: 'var size = "' + your_size + '";var color="' + your_color + '";' 
					}, function() {
						chrome.tabs.executeScript(tab1.id, {file: 'buy_inject.js'} );
					});
				}
			}
			else if(changeInfo.status=="loading" && ( buy_taobao.test(tab1.url) || buy_tmall.test(tab1.url) ) ){
				chrome.tabs.executeScript( tab1.id , {file : "inject.js" } ) ;
			}
			else if(changeInfo.status=="loading" && pay_taobao.test( tab1.url ) ){
				chrome.tabs.update( {url: last_go } ) ; 
			}
		});
	}) ;
}
