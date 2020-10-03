init()

// (Alex) Everything the tab must do upon loading.
function init() {
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

// (Alex) Blocks all occurences of "word" in "words.
// Specifically, it uses the "highlight" function (see util.js)
// to wrap "word" with two spans of classes
// "bad_word_text" (inner) and "bad_word_box" (outer).
// Why do we do it this way?
// 	1. We want to retain the text that we're blocking over,
// 	   so that if we decide we want to un-block it,
// 	   we can immediately display the text.
// 	2. We want to maintain the visual effect of a black
// 	   highlight over the word. This highlight should retain
// 	   the length of the blocked word.
// 	3. It's really tempting to just wrap *one* span around
// 	   the blocked word, and set the text color and background
// 	   color to black. However, this is a no-go since you can
// 	   just double click on the blocked text and your text
// 	   will still show up.
// 	4. It's also tempting to wrap *one* span and use 
// 	   edit css to something like {visibility: hidden}.
// 	   This won't work since it also removes other styles,
// 	   such as the background color.
function block_words(words) {
	console.log('blocking words: ' + '[' + words + ']')

	// wrap occurences of "words" with outer span
	$("*").highlight(words, {className: "bad_word_box"})
	// wrap occurences of "words" with inner span
	$("*").highlight(words, {className: "bad_word_text"})

	// higlight the outer span with black
	$(".bad_word_box").css({backgroundColor: "black"})
	// remove the inner span's text
	$(".bad_word_text").css({opacity: 0})

	// let the blocked word be clickable
	$(".bad_word_box").click(function() {alert("this is a banned word.")})

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




