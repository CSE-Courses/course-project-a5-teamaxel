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
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log('received message with service: ' + request.service)
		if (request.service == 'get_bad_words') {
			bad_words = get_bad_words()
			sendResponse({
				service: request.service,
				words: bad_words
			})
		}
		if (request.service == 'get_background_color') {
			background_color = get_background_color()
			sendResponse({
				service: request.service,
				color: background_color 
			})
		}
	}
)

// TODO: Get the bad words from the options page
function get_bad_words() {
	words = ['cat', 'the']
	return words
}

function get_background_color() {
	color = 'orange'
	return color
}
