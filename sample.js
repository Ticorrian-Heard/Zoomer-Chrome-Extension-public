//checks on whether recording is processing.
function recordingCheck(info, tab) {
    

 chrome.tabs.create({ url: "https://op.zoom.us:8443" })
 for (i=-700000000; i<700000000; i++){}
  
   //if the tab url includes 'login' re-sign in first <-----
 chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

 	var u = tabs[0].url;

    if (u.includes("login")) {
	  chrome.tabs.update( { url: "https://zoom.okta.com/app/zoomvideocommunications_zoomopsaml_1/exk1e2366bItO54U3357/sso/saml" }) //sign in to OP
	  for (i=-700000000; i<700000000; i++){}
	  chrome.tabs.executeScript({code: "document.querySelector('.jump-op2').click()"}) //sign in to OP2
	  for (i=-700000000; i<700000000; i++){}
    }

	var x = info.selectionText;
	if(x.includes("=="))
	{
		var newTab = chrome.tabs.update( { url: "https://op.zoom.us:8443/recording/check-meeting?meeting_number=&meeting_id="+ x +"&meetingUuid=&encryptMeetingId=&encryptFileId="} )

	}
	else
	{
		x = parseID(x);
		console.log("recording to audit: ", x)
	    var newTab = chrome.tabs.update( { url: "https://op.zoom.us:8443/recording/check-meeting?meeting_number=" + x + "&meeting_id=&meetingUuid=&encryptMeetingId=&encryptFileId="} )
	}
  });

}

//automatically searches a meeting ID in Meeting analyzer. 
function meetingAudit(info, tab) {

	console.log("selection: ", info.selectionText)
	var x = info.selectionText;
	var j = x.replace(/(?:\r\n|\r|\n|\D)/g, '');
	x = parseID(x);
	console.log("ID to audit: ", x)
    var newTab = chrome.tabs.create( { url: "http://supportop.zoom.us/tools/zoomopapi/userMeetingLookup.php?emailOrMeetingId="+ x +"&app_guid=&origin="}/*, function(){
    	
    	chrome.tabs.executeScript({code: "document.getElementsByTagName('a')[4].click()"})  May put this back in later 

    } */)

}

//searches users email in op GetUserInfo   else if (/^[a-zA-Z]+$/.test(str) ) 
function emailLookup(info, tab) {

 chrome.tabs.create({ url: "https://op.zoom.us:8443" })
 for (i=-700000000; i<700000000; i++){}

//if the tab url includes 'login' re-sign in first <-----
 chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

 	var u = tabs[0].url;

    if (u.includes("login")) {
	  chrome.tabs.update( { url: "https://zoom.okta.com/app/zoomvideocommunications_zoomopsaml_1/exk1e2366bItO54U3357/sso/saml" }) //sign in to OP
	  for (i=-700000000; i<700000000; i++){}
	  chrome.tabs.executeScript({code: "document.querySelector('.jump-op2').click()"}) //sign in to OP2
	  for (i=-700000000; i<700000000; i++){}
    }   

	if(info.selectionText.includes('@'))
	{
		console.log("selection text",info.selectionText)
		if (info.selectionText.includes('+')) {
			var txt = info.selectionText.split('+');
			chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=" + txt[0] + "%2b" + txt[1] + "&username=&domain=&accountId=&number="} )
		}
	 	else chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=" + info.selectionText + "&username=&domain=&accountId=&number="} )
	}
	else if(info.selectionText.includes(" "))
	{
		chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=&username="+ info.selectionText +"&domain=&accountId=&number="} )
	}
	else if(info.selectionText.includes("."))
	{
		chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=&username=&domain="+ info.selectionText +"&accountId=&number="} ) //domain search
	}
	else if ( /^[0-9]+$/.test(info.selectionText) )
	{
		chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=&username=&domain=&accountId=&number="+ info.selectionText} )
	}
	else
	{
		chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id="+ info.selectionText + "&email=&username=&domain=&accountId=&number="} )
	}
  });

}

function gmtConvert(info, tab) {

var time = info.selectionText.split(':');

if (info.menuItemId.includes("est")) miltimeConverter(parseInt(time[0]) - 4, time[1]);
else if (info.menuItemId.includes("cst")) miltimeConverter(parseInt(time[0]) - 5, time[1]);
else if (info.menuItemId.includes("pst")) miltimeConverter(parseInt(time[0]) - 7, time[1]);
else alert("error");

}

function miltimeConverter(hour, min) {

	if (hour < 0) hour += 24;
	else if (hour == 0) hour = -1;

	if (hour >= 12) {
	  if (hour == 12) var newhour = hour;
	  else var newhour = (hour % 13) + 1; //pm

	  alert(newhour + ":" + min + "pm");
	}
	else {
	  if (hour == -1) hour = 12;
	  var newhour = hour  % 13;   //am
	
	  alert(newhour + ":" + min + "am");
	}
}

//Search for keywords in zendesk
function zendeskKeySearch(info, tab) {

	var newTab = chrome.tabs.create({ url: "https://zoomus.zendesk.com/agent/search/1?q=" + info.selectionText });
}

//Search for keywords in confluence
function confluenceKeySearch(info, tab) {

	var newTab = chrome.tabs.create({ url: "https://zoomvideo.atlassian.net/wiki/search?text=" + info.selectionText });
}
//telephony analyzer meeting ID and phone number 
function telephonyIdAnalyzer(info, tab) {

	var i = info.selectionText;
	var j = i.replace(/(?:\r\n|\r|\n|\D)/g, '');
	chrome.tabs.create({ url: "https://op.zoom.us:8443/troubleshooting/searchtelecall?confno="  + j }) //used to be op2
}

function telephonyNumAnalyzer(info, tab) {

	var i = info.selectionText;
	var j = i.replace(/(?:\r\n|\r|\n|\D)/g, '');
	chrome.tabs.create({ url: "https://op.zoom.us:8443/troubleshooting/searchtelecall?confno=&callingnumber="  + j }) //used to be op2
}

function meetingAnalyzer(info, tab) {

 console.log("in meeting analyzer")

 chrome.tabs.create({ url: "https://op2.zoom.us:8443" })
 for (i=-700000000; i<700000000; i++){}

	//if the tab url includes 'login' re-sign in first <-----
 chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    
    var u = tabs[0].url;

    if (u.includes("login")) {
	  chrome.tabs.update( { url: "https://zoom.okta.com/app/zoomvideocommunications_zoomopsaml_1/exk1e2366bItO54U3357/sso/saml" }) //sign in to OP
	  for (i=-700000000; i<700000000; i++){}
	  chrome.tabs.executeScript({code: "document.querySelector('.jump-op2').click()"}) //sign in to OP2
	  for (i=-700000000; i<700000000; i++){}
    }   
	//-------------------------------------------------

	if(info.selectionText.includes("=="))
	{
		if (info.selectionText.includes('+')) {     
			var txt = info.selectionText.split('+');

			var string = txt[0] + "%2b";   //if there are 2+ plus signs
 			for (i=1; i<txt.length; i++){
 				if (i < txt.length - 1) string = string + txt[i] + "%2b";
 				else string = string + txt[i];
 			}

			chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?confid=" + string })
			for (i=-590000000; i<590000000;i++){} 
        	chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
		}
		else {
			chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?confid=" + info.selectionText })
			for (i=-590000000; i<590000000;i++){} 
        	chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
    	}   
	}
	else if (info.selectionText.includes("@"))
	{
		if (info.selectionText.includes('+')) {
			var txt = info.selectionText.split('+');
			chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?email=" + txt[0] + "%2b" + txt[1] })
			for (i=-590000000; i<590000000;i++){} 
        	chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
		}
	 	else chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?email=" + info.selectionText }) //host email search
	 		for (i=-590000000; i<590000000;i++){} 
        	chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
	}
	else if ( /^[0-9 ]+$/.test(info.selectionText) ) 
	{
		var test = parseID(info.selectionText);
		//searchID(info.selectionText);
		chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?confno=" + test })
		for (i=-590000000; i<590000000;i++){} 
        chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
	}
	else if ( /^[a-zA-Z!@#$%^&*()_=+"'?/\|.,`~ ]+$/.test(info.selectionText) || /^[a-z!@#$%^&*()_=+"'?/\|.,`~ ]+$/.test(info.selectionText) || /^[A-Z!@#$%^&*()_=+"'?/\|.,`~ ]+$/.test(info.selectionText) 
		   || /^[0-9a-zA-Z!@#$%^&*()_=+"'?/\|.,`~ ]+$/.test(info.selectionText) || /^[0-9A-Z!@#$%^&*()_=+"'?/\|.,`~ ]+$/.test(info.selectionText) || /^[0-9a-z!@#$%^&*()_=+"'?/\|.,`~ ]+$/.test(info.selectionText) )
	{
		chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?username=" + info.selectionText }) //user name seaarch
		for (i=-590000000; i<590000000;i++){} 
        chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
	}
	else 
	{
		var test = parseID(info.selectionText);
		//searchID(info.selectionText);
		chrome.tabs.update( { url: "https://op2.zoom.us:8443/troubleshooting/searchmeeting?confno=" + test })
		for (i=-590000000; i<590000000;i++){} 
        chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})
	}

  });

}

//injects meeting ID selected into OP page and the click the search button. 
/*function searchID(x)
{
	console.log("in searchID", x);
	var newTab = chrome.tabs.create( { url: 'https://op2.zoom.us:8443/troubleshooting/searchmeeting' }, function(){

		//add check here to see if sign in was successful. If not, copy id to clipboard and maybe add lister to see when MA page loads. 
		console.log('in callback: *'+ x+'*')
		var pId = parseID(x);
  		command = "document.getElementById('confno').value = '" + pId + "'";
  		console.log("command:", command);
  		chrome.tabs.executeScript({
          code: command
        }, function(){
        	chrome.tabs.executeScript({code: "document.getElementById('btnSearch').click()"})

        	//could likely automate the meeting analysis process by clicking analyze on the first result.
        });
	});

}*/

//basic meeting ID formatting. 
//currently does not work with personal links.
//zoom.us/j/xxxx -> xxxx
// function parseID(id)
// {
// 	//have a special case for personal links. search for /my/xxxxx
// 	//if(id.contains(/my/){}
// 	//else
// 	var newId = id.replace(/(?:\r\n|\r|\n|\D)/g, '');
// 	console.log("parsed string: ", newId);
// 	return newId
// }

//case 1: only meeting ID
//case 2: personal meeting links
//case 3: meeting links with numbers in the vanity url
//case 4: partial links
function parseID(id)
{
	  var newID = id.split("/");
	  var i = newID.length - 1;
  
  	  if (id.includes("my")) return personalLinkCheck(id); //return personalLinkCheck(id)
  		
  	  else {
  	    console.log("parsed string: ", newID[i]);
  	    return newID[i]
	  }
}

//searches user by user name in op GetUserInfo
function kbSearch(info, tab) {

	var newTab = chrome.tabs.create( { url: "https://support.zoom.us/hc/en-us/search?utf8=%E2%9C%93&query=" + info.selectionText } )

}

function copyToClip(text){

	navigator.clipboard.writeText(text)
	  .then(() => {
	    console.log('Text copied to clipboard', text);
	  })
	  .catch(err => {
	    // This can happen if the user denies clipboard permissions:
	    console.error('Could not copy text: ', err);
	  });
}

//searches user by user name in op GetUserInfo
function zendeskSearch(info, tab) {

	var tickId = parseID(info.selectionText)
	var newTab = chrome.tabs.create( { url: "https://zoomus.zendesk.com/agent/tickets/" + tickId   } )

}

//quick search in jira
function jiraSearch(info, tab) {

	var query = info.selectionText;

	if ( info.menuItemId.includes("bug") ) var newTab = chrome.tabs.create( { url: "https://zoomvideo.atlassian.net/issues/?jql=text ~ \""+ query +"\" AND type IN (bug, ticket) AND status = Open AND (created < \"-7d\" OR updated < \"-7d\") ORDER BY created DESC"  } )
	else if (info.menuItemId.includes("FR") ) var newTab = chrome.tabs.create( { url: "https://zoomvideo.atlassian.net/issues/?jql=text ~ \""+ query +"\" AND type IN ('feature request') AND status = Open ORDER BY created DESC"  } )
	

}


//get rid of second script, no need to load jquery. not working. 
// https://stackoverflow.com/questions/32594375/simulate-enter-key-in-jquery-or-javascript
// https://stackoverflow.com/questions/3276794/jquery-or-pure-js-simulate-enter-key-pressed-for-testing
// https://stackoverflow.com/questions/57216410/how-to-simulate-an-enter-key-button-in-javascript
function mandrillSearch(info,tab)
{
	var x = info.selectionText;
	console.log("in mandrill search", );
	var newTab = chrome.tabs.create( { url: 'http://supportop.zoom.us/tools/mandrill-api-php/src/index.php' }, function(){

  		command = "document.getElementById('email').value = '" + x + "'";

        	chrome.tabs.executeScript({code: command +
        			// ";var e = jQuery.Event('keydown'); e.which = 13;  $('#email').focus(); $('#email').trigger(e);" +
        		 //    "var simulatedEvent = new KeyboardEvent('keypress', {keyCode: 13, which: 13});" +
    				";document.getElementById('email').focus();" 
    	// 			+
    	// 			"var keyboardEvent = new KeyboardEvent('keypress', {bubbles:true}); " +
					// "Object.defineProperty(keyboardEvent, 'charCode', {get:function(){return this.charCodeVal;}}); " +
					// "keyboardEvent.charCodeVal = [13];"+
					// "document.getElementById('email').dispatchEvent(keyboardEvent);"
        });
	});

}

//caveat: launches 3 tabs. add window.close()?
function personalLinkCheck(id) {

  var newTab = chrome.tabs.create( { url: id } ); //launch personal link to resolve personal link to PMI link
  
  for (i=-100000000; i<700000000; i++){} //buffer to allow page to load PMI link

  chrome.tabs.query({active:true, currentWindow:true}, //pulls PMI link from launch page 
    function(tabs){
      //search using PMI link
      var test = parseID(tabs[0].url);
	  chrome.tabs.create( { url: "https://op.zoom.us:8443/troubleshooting/searchmeeting?confno=" + test } )
    });
}

function autoLogin(info, tab) {

 chrome.tabs.create({ url: "https://op.zoom.us:8443" })
 for (i=-700000000; i<700000000; i++){}

 chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
   var u = tabs[0].url;

   if (u.includes("login")) {
    chrome.tabs.update({ url: "https://zoom.okta.com/app/zoomvideocommunications_zoomopsaml_1/exk1e2366bItO54U3357/sso/saml" })
    for (i=-700000000; i<700000000; i++){}
    for (i=-300000000; i<300000000; i++){}
 	}

  if (info.selectionText.includes('@'))
	{
		console.log("selection text",info.selectionText)
		if (info.selectionText.includes('+')) {
			var txt = info.selectionText.split('+');
			chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=" + txt[0] + "%2b" + txt[1] + "&username=&domain=&accountId=&number="} )
		}
	 	else chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id=&email=" + info.selectionText + "&username=&domain=&accountId=&number="} )
	}
  else
	{
		chrome.tabs.update( { url: "https://op.zoom.us:8443/user/search?id="+ info.selectionText + "&email=&username=&domain=&accountId=&number="} )
	}

	for (i=-100000000; i<700000000; i++){} //buffer
  		chrome.tabs.executeScript({code: "var i = document.getElementById('user-list').rows[1].cells[1].innerHTML;" +
  								   "var u = i.split('\"'); " + //get user id string
  								   "var ur = u[1].split('?');" + //get rid user/
  								   "var url = ur[1].replace(/amp;/,''); " + //get 'amp;'' out of ur[1] 
  								   
  								   "var win = window.location.href;" +
  								   "if (win.includes(\"us04op\")) {location.replace(\"https://us04op.zoom.us:8443/user/admin/login_web?\" + url); }" + //free user case use us04 database //us04op
  								   "else if (win.includes(\"us02op\")) {location.replace(\"https://us02op.zoom.us:8443/user/admin/login_web?\" + url); }" + //us02 pro database //us02op
  								   "else { location.replace(\"https://op.zoom.us:8443/user/admin/login_web?\" + url); }"}); //va2
  });
}

//audits the users meeting
function auditMeeting(info, tab) {

  var newInfo = parseID(info.selectionText);
  var newTab = chrome.tabs.create( { url: "https://op.zoom.us:8443/audit/meeting/search?meetingid=&meetingNum=" + newInfo.replace(/(?:\r\n|\r|\n|\D)/g, '')})

}


//context menus: meeting analyzer, user search, meeting audit, recording check, meeting host check.
chrome.contextMenus.create({"title": "Meeting Analyzer: id/uuid/email/hostname", "contexts":["selection", "link"],
                                       "onclick": meetingAnalyzer});


chrome.contextMenus.create({"title": "Telephony Analyzer", "contexts":["selection", "link"],
                                       "id": "telParent", "onclick": telephonyIdAnalyzer});  
chrome.contextMenus.create({"title": "Meeting ID", "contexts":["selection", "link"], 
                                       "parentId": "telParent", "onclick": telephonyIdAnalyzer});
chrome.contextMenus.create({"title": "Phone Number", "contexts":["selection", "link"],
                                       "parentId": "telParent", "onclick": telephonyNumAnalyzer});


chrome.contextMenus.create({"title": "User Search: email/id/name/van/account#", "contexts":["selection", "link"],
                                       "onclick": emailLookup});

chrome.contextMenus.create({"title": "Recording Check: id/uuid", "contexts":["selection", "link"],
                                       "onclick": recordingCheck});
chrome.contextMenus.create({"title": "Meeting Host Check: id", "contexts":["selection", "link"],
                                       "onclick": meetingAudit});

chrome.contextMenus.create({"title": "separator", "type": "separator", "contexts":["selection", "link"]});



chrome.contextMenus.create({"title": "More", "contexts":["selection", "link"],
                                       "id": "moreParent", "onclick": kbSearch});
chrome.contextMenus.create({"title": "Mandrill search: email", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "onclick": mandrillSearch});

chrome.contextMenus.create({"title": "separator", "type": "separator", "contexts":["selection", "link"]});

chrome.contextMenus.create({"title": "separator", "type": "separator", "contexts":["selection", "link"]});
chrome.contextMenus.create({"title": "Auto Login", "contexts":["selection", "link"],
                                       "onclick": autoLogin});

chrome.contextMenus.create({"title": "GMT Converter", "contexts":["selection", "link"],
                                       "id": "gmtParent", "onclick": gmtConvert});

chrome.contextMenus.create({"title": "est", "contexts":["selection", "link"],
                                       "parentId": "gmtParent", "id":"est", "onclick": gmtConvert}); //est
chrome.contextMenus.create({"title": "cst", "contexts":["selection", "link"],
                                       "parentId": "gmtParent", "id":"cst", "onclick": gmtConvert}); //cst
chrome.contextMenus.create({"title": "pst", "contexts":["selection", "link"],
                                       "parentId": "gmtParent", "id":"pst", "onclick": gmtConvert}); //pst

chrome.contextMenus.create({"title": "KB search: text", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "onclick": kbSearch});
chrome.contextMenus.create({"title": "Zendesk search: ticket id", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "onclick": zendeskSearch});

chrome.contextMenus.create({"title": "Zendesk search: keyword", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "onclick": zendeskKeySearch});

chrome.contextMenus.create({"title": "Confluence search: keyword", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "onclick": confluenceKeySearch});

//----------------------------------------------------------------------------------------------------------
chrome.contextMenus.create({"title": "JIRA Smart Search", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "id": "jiraParent", "onclick": jiraSearch});
chrome.contextMenus.create({"title": "Bug/Ticket", "contexts":["selection", "link"],
                                       "parentId": "jiraParent", "id":"bug", "onclick": jiraSearch});
chrome.contextMenus.create({"title": "Feature Request/Task", "contexts":["selection", "link"],
                                       "parentId": "jiraParent", "id":"FR", "onclick": jiraSearch});
//----------------------------------------------------------------------------------------------------------

chrome.contextMenus.create({"title": "Audit Meeting: id", "contexts":["selection", "link"],
                                       "parentId": "moreParent", "onclick": auditMeeting});

