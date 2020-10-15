//OP helper tool written by Jose Sanchez
//Should help automate many of the searches that have to be done regularly by TSEs
-------------------------------------------------------------------
INSTALL INSTRUCTIONS
-------------------------------------------------------------------
Zoomer Extension
install instruction

1. Unzip folder.
2. On chrome navigate to: chrome://extensions/
3. Enable developer mode on top right of window.
4. Click "load unpacked" on top left of window.
5. Select unzipped folder.
-------------------------------------------------------------------
RELEASE NOTES
-------------------------------------------------------------------
/* 
version 0.5 (updated by Ticorrian Heard 3/11/2020)
- added personal link support
- added audit meetings support
- added auto login for user accounts
- adjusted parsedID() to support vanity url with numbers
  in them

bugs:
- when searching for users with a '+' in their name, 
   OP takes out the + and the search fails

- 'You are logged in through the OP system, which prevents you from starting or joining a meeting.' 
     when analyzing personal link. Just log out of the user account and try again.

version 0.6 (Updated by Jose Sanchez 3/11/2020)
-Implemented all work by Ticorrian Heard noted above
-Mandrill search
-ability to search M.A by uuid/id
-ability to search users by email/name/user ID
-ability to highligh text and search it in zendesk/support.zoom.us
-zendesk ticket number option to open ticket by selecting ticket number


version 0.7 (updated by Ticorrian Heard 4/6/2020)
- added auto login for uuid/email/user name
- added telephony analysis for meeting ID and phone numbers
- added a gmt converter
- added vanity url search
- meeting analyzer search by host email and user name
- added zendesk keyword search (you have to disable the zendesk well behaved windows extension here chrome://extensions)
- fixed auto login bug where free users in us04op database couldnt be logged in
*/