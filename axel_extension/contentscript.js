init()

// TODO: put this in another file
// (Alex) Custom questions that we randomly select from for educational game.
var custom_questions = 
[
	{
		q: "What color is the sky?",
		a: "blue"
	},
	{
		q: "What is the capital of France?",
		a: "Paris"
	},
	{
		q: "What is the name of the team that Lebron James plays for?",
		a: "Lakers"
	},
	{
		q: "What is the most abundant gas in Earth's atmosphere?",
		a: "nitrogen"
	},
	{
		q: "Aaron's mom has 5 children: Matthew, Javiaire, Amanda, and Alex. What is the name of the fifth child?",
		a: "Aaron"
	}
]




// (Alex) Everything the tab must do upon loading.
function init() {

	chrome.storage.sync.get('mode', function(result) {
		mode = result['mode']

		console.log('mode is ' + mode)
		if (mode == 'admin') {
			// no need to block content, so do nothing
		}
		else {
			chrome.storage.sync.get('bad_words', function(result) {
				let bad_words = result['bad_words']
				view(bad_words)
				if (mode == 'child_view') {
					// do nothing
				}
				else if (mode == 'child_context_clue_game') {
					context_glue_game()
				}
				else if (mode == 'child_educational_game') {
					educational_game()
				}
				else {
					console.log('unrecognized mode: ' + mode)
				}
			})
		}
	})
}

// (Alex) Blocks all occurences of "word" in "words".
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

}

// (Alex) Blocks all paragraphs.
// Same format for blocking as for block_words, except
// we add an "id" in order to refer to specific paragraphs.
// This allows us to unblock specific paragraphs for the 
// educational game mode.
function block_paragraphs() {
	console.log('blocking all paragraphs')
	let box_id = 0
	let text_id = 0
	$("p").wrap(
		function() {
			let box_str = "<div class='paragraph_box' id='paragraph_box_" + box_id + "'></div>"
			box_id++
			return box_str
		}
	)
	$("p").wrap(
		function() {
			let text_str = "<div class='paragraph_text' id='paragraph_text_" + text_id + "'></div>"
			text_id++
			return text_str
		}
	)
	// higlight the outer span with black
	$(".paragraph_box").css({backgroundColor: "black"})
	// remove the inner span's text
	$(".paragraph_text").css({opacity: 0})
}

function view(bad_words) {
	block_words(bad_words)
	// let the blocked word be clickable
	$(".bad_word_box").click(function() {alert("this is a banned word.")})
}

// (Alex) TODO: implement this
function context_clue_game() {

	// block words, but randomly

}



function educational_game() {

	// block paragraph by paragraph
	block_paragraphs()

	$(".paragraph_box").click(function() {

		// TODO: get this from Chrome storage,
		//  this should be set by admin
		let question_type = "addition"

		// get question and answer
		let q_and_a = get_question(question_type)
		let question = q_and_a[0]
		let answer = q_and_a[1]

		// get attempt from user
		let attempt = prompt(question)

		console.log("question: " + question)
		console.log("correct answer: " + answer)
		console.log("attempted answer: " + attempt)

		if (attempt == answer) {
			// get id's of corresponding box/text id
			let box_id = $(this).attr("id")
			let text_id = "paragraph_text_"+box_id.slice(-1)
			console.log("box_id = " + box_id)
			console.log("text_id = " + text_id)

			// reset settings of clicked paragraph
			$("#"+text_id).css({opacity: 1})
			$("#"+box_id).css({backgroundColor: ""})

			alert("Correct. Unblocking paragraph.")
			console.log("correct answer")
		}
		else {
			alert("Incorrect. Paragraph will remain blocked.")
			console.log("incorrect answer")
		}
	})

}


// (Alex) Get a question to ask the user. 
// Called when in educational game mode.
function get_question(type) {
	let question 
	let answer
	// generate random addition question
	if (type == "addition") {
		let first = Math.floor(Math.random() * 100)
		let second = Math.floor(Math.random() * 100)
		question = first + " + " + second + " = ?"
		answer = first + second
	}
	// pick a random custom question from custom_questions
	else if (type == "custom") {
		len = custom_questions.length
		index = Math.floor(Math.random() * len)
		q_and_a = custom_questions[index]
		question = q_and_a.q
		answer = q_and_a.a
	}
	else {
		console.log("unrecognized question type: " + type)
	}
	return [question, answer]
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




