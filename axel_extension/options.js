/*
*
*  @param val - the value being inserted into the table
*  @param wTable - the table being inserted into
*
 */

let val;

window.onload =  reloadPage;

function checkValidURL() {

    let goodURL = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!!goodURL.test(val) == true) { return true;}

    alert("NOT A VALID URL PLEASE RE-ENTER");
    return false;
};

function addWebsite(){
    val = document.getElementById("websiteURL").value;
    if(checkValidURL()) {
        $("#websiteTable tbody").append(
            "<tr>" +
            "<td>" + val + "</td>>" +
            "</tr>"
        );
    }

};

function addWord(){

    val = document.getElementById("bannedWord").value;
    // (Alex) add banned word to storage
    sync_add_word(val);

};

//adds website when button is clicked

//changed to test

$('#addWebsite').on('click',function(){ addWebsite()});

//adds word when button clicked

$('#addWord').on('click',function(){ addWord() });



//Removes a website when clicked on
$('#websiteTable').on('click' , function() {

    var tab = document.getElementById('websiteTable').getElementsByTagName('tbody')[0];
    var rows = tab.getElementsByTagName('tr');
    for ( i = 0; i < rows.length; i++) {
        rows[i].onclick = function() {
            var ans = confirm("Would you like to Delete this Website?");
            if(ans) {
                tab.deleteRow(this.rowIndex-1);
            }else{
                alert("not removed");
            }
        }
    }
});




//Removes a word when clicked on
$('#wordTable').on('click' , function() {

    var tab = document.getElementById('wordTable').getElementsByTagName('tbody')[0];
    var rows = tab.getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function() {
            var ans = confirm("Would you like to Delete this Word?");
            if(ans) {
                sync_remove_word(this.innerText);

            }else{
                alert("not removed");
            }
        }
    }

});






// (Alex) Adds a word to the bad_words list in storage.
// Should be called every time admin adds another banned word.
function sync_add_word(word) {
	chrome.storage.sync.get('bad_words', function(result) {
		let words = result['bad_words']
		console.log('current words are ' + words)
		words.push(word)
		chrome.storage.sync.set({'bad_words': words}, function(){})
		console.log('new words are ' + words)
        reloadPage();
	})
}

// (Alex) TODO: This method is untested, not sure if removing from an array like this works. 
// Removes a word from the bad_words list in storage.
// Should be called every time admin removes a banned word.
function sync_remove_word(word) {
	chrome.storage.sync.get('bad_words', function(result) {
		let words = result['bad_words']
		console.log('current words are ' + words)
		let pos = words.indexOf(word)
		if (pos != -1) {
			words.splice(pos, 1)
		}
		chrome.storage.sync.set({'bad_words': words}, function(){})
		console.log('new words are ' + words)
        reloadPage();
	})
}

function reloadPage(){
    $("#wordTable tbody").empty();
    chrome.storage.sync.get('bad_words', function(result) {
        let words = result['bad_words'];


        words.forEach(function(word){
            $("#wordTable tbody").append(
                "<tr>" +
               "<td>" + word  +"</td>>"+
               "</tr>"
            )

        })
    });
}


//function to load pages with correct tab









