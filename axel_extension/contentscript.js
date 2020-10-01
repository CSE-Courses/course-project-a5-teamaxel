start_up()


// (Alex) Everything the tab must do upon loading.
function start_up() {
	chrome.storage.sync.get('mode', function(result) {
		mode = result['mode']
		if (mode == 'admin') {
			// no need to block content, so do nothing
		}
		else {
			chrome.storage.sync.get('bad_words', function(result) {
				words = result['bad_words']
				block_words(words)
			})
			if (mode == 'child_view') {
				// do nothing
			}
			else if (mode == 'child_context_clue_game') {
				context_glue_game()
			}
			else if (mode == 'child_educational_game') {
				educational_game()
			}
		}
	})
}


// (Alex) Replaces given 'abcd' with '====',
// for each word in words.
function block_words(words) {
	console.log('blocking ' + words)
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

// (Alex) TODO: implement this
function context_clue_game() {

	// block words, but randomly

}


// (Alex) TODO: implement this
function educational_game() {

	// block paragraph by paragraph

}






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

function message_test() {
	chrome.runtime.sendMessage(
		{service: 'get_background_color'},
		function(response) {
			document.body.style.backgroundColor = response.color 
		}
	)
}

