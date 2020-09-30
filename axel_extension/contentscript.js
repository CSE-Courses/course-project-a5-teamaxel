var test = true
if (test) {
	basic_test()
}

function basic_test() {
	set_background_color()
	no_the()
}

// Proof of concept for string replacement
// THIS IS NOT MY CODE
// Code copied from: https://www.peterdebelak.com/blog/search-and-replace-text-with-javascript/
function no_the() {
  var html = document.querySelector('html');
  var walker = document.createTreeWalker(html, NodeFilter.SHOW_TEXT);
  var node;
  while (node = walker.nextNode()) {
    node.nodeValue = node.nodeValue.replace(/the/, '===')
  }
}

// Proof of concept for message sending
function set_background_color() {
	background_color = null
	chrome.runtime.sendMessage(
		{service: 'get_background_color'},
		function(response) {
			console.log('response received')
			background_color = response.color
			document.body.style.backgroundColor = background_color
		} 
	)
}

