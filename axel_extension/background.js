/*  Upon installation of the chrome extension, a key-value mapping 
 *  {first_time: 'true'} is stored in chrome's storage. We grab this stored
 *  object in "popup.js".
 */

chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({first_time: 'true'}, function(){
        console.log('Value is set to ' + true);
    });
    chrome.storage.sync.set({state: 'child'}, function(){
        console.log('State intialized to Child Mode');
    })
    chrome.storage.sync.set({password:'initialpass'}, function(){
        console.log('Password intialized to: initialpass');
    })
    
    // (Alex) Initialize bad_words to empty array.
    //TODO: use a set, not an array.
    chrome.storage.sync.set({'bad_words': []})

    // (Alex) Initialize mode to child_view.
    chrome.storage.sync.set({'mode': 'child_view'})
});



// ---------------------------------------------------------------------
// (Alex) BELOW IS NOT USED
// The function below tests some basic functionality of message passing.
// At first, I thought to implement mode changes and banned word changes
// via message passing.
// But then I realized that everything that doesn't need to be done
// immediately can be implemented via chrome.storage.
// If you want to implement message passing, feel free to use this
// as inspiration.
// An example of a good message passing use case is if we want to
// immediately notify each tab to refresh/update as soon as we change
// something.

/*
chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
		if (request.service == 'get_background_color') {
			sendResponse({color: 'green'})
		}
        }
)
*/
