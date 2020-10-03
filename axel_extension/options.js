/*
*
*  @param val - the value being inserted into the table
*  @param wTable - the table being inserted into
*
 */

let val;

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
    $("#wordTable tbody").append(
        "<tr>" +
        "<td>" + val  +"</td>>"+
        "</tr>"
    );

    // (Alex) add banned word to storage
    sync_add_word(val);
};

//adds website when button is clicked

$('#addWebsite').on('click',function(){ addWebsite();})

//adds word when button clicked

$('#addWord').on('click',function(){ addWord(); })



//Removes a website when clicked on
$('#websiteTable').on('click' , function() {

    var tab = document.getElementById('websiteTable').getElementsByTagName('tbody')[0]
    var rows = tab.getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++) {
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

    var tab = document.getElementById('wordTable').getElementsByTagName('tbody')[0]
    var rows = tab.getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function() {
            var ans = confirm("Would you like to Delete this Word?")
            if(ans) {
                tab.deleteRow(this.rowIndex-1);

    		// (Alex) Remove banned word from storage.
		removed_word = this.innerText;
    		sync_remove_word(removed_word)

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
		words.push(word)
		chrome.storage.sync.set({'bad_words': words}, function(){})
		console.log('added "' + word + '", updated words are [' + words + ']')
	})
}

// (Alex) Removes a word from the bad_words list in storage.
// Should be called every time admin removes a banned word.
function sync_remove_word(word) {
	chrome.storage.sync.get('bad_words', function(result) {
		let words = result['bad_words']
		let pos = words.indexOf(word)
		if (pos != -1) {
			words.splice(pos, 1)
		}
		chrome.storage.sync.set({'bad_words': words}, function(){})
		console.log('removed "' + word + '", updated words are [' + words + ']')
	})
}




