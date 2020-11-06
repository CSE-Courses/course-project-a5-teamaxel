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
			var blocked = 0;
			/*(Matthew)
			This section handles blocking banned websites. If the website is banned 
			we skip the unlocking process. If not we next check to see if the the
			website is unlockable. If it is we ask the user if they wish to use 
			their points to unlock it. If they do the webpage is unlocked and 
			words are blocked. If they don't want to unlock it or they can't the 
			page will be blocked. If it is not a unlockable or blocked we just block
			the words.
			*/
			chrome.storage.sync.get('bad_websites', function(result) {
				let bad_websites = result['bad_websites']
				let size = bad_websites.length;
				for(i = 0; i<size; i++){
					website = bad_websites[i]
					var currentWebsite = window.location.href;
					if(currentWebsite.startsWith(website) && website!= "") {
						view_blocked();
						blocked = 1;
						return;
					}
				}
				if(blocked == 0){
			chrome.storage.sync.get('point_websites', function(result) {
				let point_websites = result['point_websites']
				let size = point_websites.length;
				for(i = 0; i<size; i++){
					website = point_websites[i]
					var currentWebsite = window.location.href;
					if(currentWebsite.startsWith(website) && website!= "") {
						var storedPoints = 0;
						chrome.storage.sync.get(['pointTotal'], function(result){
          					console.log('points grabbed is ' + result.pointTotal);
							storedPoints = result.pointTotal;
							if(storedPoints >= 2000){
							var ans = confirm("This website is locked. Would you like to spend 2000 points to unlock this site");
							if(ans){
								subtract_points();
								chrome.runtime.sendMessage({greeting: "Timer"}, function(response) {
  									console.log(response.farewell);
								});
								setTimeout(testing_time,5000);// the time is only so low due to the purpose of displaying
							}
							else{
								view_blocked();
							}
							return;
							}
							else{
								view_blocked();
								alert("This site can be unlocked for 2000 points. Currently you do not have enough points to unlock the site");
							}
				         });
					}
				}
				blocked = 0;
			})

		}
				chrome.storage.sync.get('bad_words', function(result) {
					let bad_words = result['bad_words']
					view(bad_words)
					if (mode == 'child_view') {
						// do nothing
					}
					else if (mode == 'child_context_clue_game') {
						context_clue_game()
					}
					else if (mode == 'child_educational_game') {
						educational_game()
					}
					else {
						console.log('unrecognized mode: ' + mode)
					}
				})
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

	// stop clicking functionality
	$(".bad_word_box").click(function() { return false; } );

}

// (Javi) Function to block random words. I iterate throguh every word within a 
// <p> tag, and highlight every occurence of a word at random (using Math.Random() 
// as the random feature). 
// Since I can only assign classnames via the highlight function, I utilized
// the class attribute like the block_paragraphs() function utilized the id attribute

function block_random_words(){
	console.log('blocking random words')

	let word_id = 0

	//keep track of all words blocked for the current <p> tag to ensure that
	//every blocked word is only highlighted once
	var blockedWords = []

	//iterate thru every p element 
	$("p").each(function()
	{
		//textArray is an array holding each word of the current <p> tag's text
		var textArray = $(this).text().split(' ')

		//iterate thru every word within textArray
		for(var i = 0; i < textArray.length; i++){
			//Math.random() returns a value between 0 & 1. We can always adjust this to increase/decrease
			//the frequency
			if(Math.random() >= 0.9 && blockedWords.indexOf(textArray[i].toLowerCase()) == -1) {
				//highlight the word (textArray[i]) only within the current <p>'s text
				$(this).highlight(textArray[i], {className: "random_box_" + word_id, wordsOnly: true})
				$(this).highlight(textArray[i], {className: "random_text_" + word_id, wordsOnly: true})

		 		$(".random_box_" + word_id).css({backgroundColor: "black"})
				$(".random_text_" + word_id).css({opacity: 0})

				// stop clicking functionality
				$("[class^='random_box'").click(function() { return false; } );

				word_id++
				blockedWords.push(textArray[i].toLowerCase())
			}
		}
	});

	console.log("done blocking random words")
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
	$(".paragraph_box").css({backgroundColor: "blue"})
	// remove the inner span's text
	$(".paragraph_text").css({opacity: 0})
	// stop clicking functionality
	$(".paragraph_box").click(function() { return false; } );
}

function view(bad_words) {
	block_words(bad_words)

	// let the blocked word be clickable
	$(".bad_word_box").click(function() {alert("this is a banned word.")})
}

//blocks the websites
function view_blocked(website){
	document.documentElement.innerHTML = '';
	document.documentElement.innerHTML = 'Domain is blocked';
	document.documentElement.scrollTop = 0;
}


function context_clue_game() {

	// block words, but randomly
	block_random_words()

	//when every element with a classname starting with "random_box" is clicked
	$('[class^="random_box"]').click(function() {
		//retrieve the blocked text
		var blocked_text = $(this).text()

		//prompt user what they believe the blocked word is, based off of context clues
		let user_input = prompt('Using your context clues, what do you think the blocked word (singular) is?')
		
		//if user_input is valid value and equals the blocked text, then it will be unblocked
		if( user_input != null && (blocked_text.toLowerCase() == user_input.toLowerCase())){

			//string parsing to retrieve the specific classname of the current blocked text
			var word_id = $(this).attr('class').split('random_box_')[1]

			$('.random_box_' + word_id).css({backgroundColor: ""})
			$('.random_text_' + word_id).css({opacity: 1})
			reward_points();//Point portion
			alert('Correct. Unblocking word.')
		}
		else{
			alert("Incorrect. Word will remain blocked.")
		}
	})

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
			console.log("correct answer")

			// get id's of corresponding box/text id
			let box_id = $(this).attr("id")
			let id = box_id.slice("paragraph_box_".length)
			let text_id = "paragraph_text_"+id
			console.log("box_id = " + box_id)
			console.log("text_id = " + text_id)

			// reset settings of clicked paragraph
			$("#"+text_id).css({opacity: 1})
			$("#"+box_id).css({backgroundColor: ""})
			
			reward_points();// Point portion
			
			//document.getElementById("pointTotal").innerHTML = parseInt(document.getElementById("pointTotal").innerHTML) + parseInt(100);
			alert("Correct. Unblocking paragraph.")
		}
		else {
			console.log("incorrect answer")
			alert("Incorrect. Paragraph will remain blocked.")
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

//(Matthew) Add points when getting a correct answer in gamemodes.
// 			Called when inside Gamemodes.

function reward_points(){
	chrome.runtime.sendMessage({greeting: "Points"}, function(response) {
  			console.log(response.farewell);
			});
	
}

//(Matthew) Sends message to backround script to subtract points 
//			when unlocking websites.
function subtract_points(){
	chrome.runtime.sendMessage({greeting: "Sub_Points"}, function(response) {
  			console.log(response.farewell);
			});
	
}

/*(Matthew)
	The below function is called when the timer expires. When the timer expires
	it will ask the user if they want to continue going. If it does it will take 2000
	more points. If not it will block the page. In the instance of the user not having
	enough points it will inform them so and block the content.
*/
function testing_time(){
	chrome.storage.sync.get('pointTotal', function(result) {
	if(result.pointTotal >= 2000 ){	
		var ans = confirm("Your website browsing time has expired. If you wish to continue you must spend 2000 more points.");
		if(ans){
			subtract_points();
			chrome.runtime.sendMessage({greeting: "Timer"}, function(response) {
		  	console.log(response.farewell);
			});
			setTimeout(testing_time,5000);	
		}
		else{
			view_blocked();
			chrome.storage.sync.set({'Time':'No Timer'},function(){
				console.log('Time is Now ' + 'No Timer');
			});
		}
	}
	else{
		alert("You do not have enough points to continue. Blocking the page")
		view_blocked();
		chrome.storage.sync.set({'Time':'No Timer'},function(){
			console.log('Time is Now ' + 'No Timer');
		});
	}
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

function message_test() {
	
	chrome.runtime.sendMessage(
		{service: 'get_background_color'},
		function(response) {
			document.body.style.backgroundColor = response.color 
		}
	)
}
}



