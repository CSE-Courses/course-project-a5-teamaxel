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
    chrome.storage.sync.set({'password':'initialpass'}, function(){
        console.log('Password intialized to: initialpass');
    });
    
    // (Alex) Initialize bad_words to empty array.
    //TODO: use a set, not an array.
    chrome.storage.sync.set({'bad_words': []});

    //(Aaron) Initialize bad_websites to empty array
    chrome.storage.sync.set({'bad_websites': []});

    // (Alex) Initialize mode to child_view.

    chrome.storage.sync.set({'mode': 'child_view'}, function (){
        console.log('Mode initialized to "child_view"');
    });

	chrome.storage.sync.set({'pointTotal': 0},function(){
			console.log('Points Total is Now ' + 0);
		});

});
