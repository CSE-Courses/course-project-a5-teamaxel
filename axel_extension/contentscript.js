
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		message_handler(request)
	}
)

const test = true 
if (test) { 
	basic_test()
}

start_up()










// (Alex) Things to do when the tab is initally opened.
function start_up() {
	chrome.runtime.sendMessage(
		{service: 'get_bad_words'},
		function(response) {message_handler(response)}
	)
}

// (Alex) Handles messages and responses from other scripts,
// namely background.js and (maybe) options.js.
function message_handler(message) {
	console.log('received message with service: ' + message.service)
	if (message.service == 'get_bad_words') {
		block_words(message.words)
	}
	else if (message.service == 'get_background_color') {
		set_background_color(message.color)
	}
	else {
		console.log('service is not valid')
	}

}

// (Alex) Replaces given 'abcd' with '====',
// for each word in words.
function block_words(words) {
	html = document.querySelector('html')
	walker = document.createTreeWalker(html, NodeFilter.SHOW_TEXT)
	while (node = walker.nextNode()) {
		for (i=0; i < words.length; i++) {
			word = words[i]
			exp = new RegExp(word, 'i')
			rep = ''
			for (j = 0; j < word.length; j++) {
				rep += '='
			}
			node.nodeValue = node.nodeValue.replace(exp, rep)
		}
	}
}

// (Alex) Test some basic functionality of message passing.
function basic_test() {
	chrome.runtime.sendMessage(
		{service: 'get_background_color'},
		function(response) {message_handler(response)}
	)
}

// (Alex) Sets background color to color.
// Primarily used for testing purposes.
function set_background_color(color) {
	document.body.style.backgroundColor = color 
}


