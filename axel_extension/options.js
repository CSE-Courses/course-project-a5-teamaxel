
/*
*
*  @param val - the value being inserted into the table
*  @param wTable - the table being inserted into
*
 */

let val;
var restrictionList;
let gList = ["abbo", "abo","abortion", "abuse", "addict", "addicts",
    "alligatorbait", "anal", "analannie", "analsex", "angie", "anus", "aroused",
    "arse", "arsehole", "banging", "bastard", "bazongas", "bazooms", "beaner",
    "bestial", "bestiality", "bi", "biatch", "bicurious", "bigass",
    "bigbastard", "bigbutt", "bisexual", "bi-sexual", "christ",
    "coitus", "condom", "fart", "farted", "farting", "farty", "fat", "fatso",
    "givehead", "glazeddonut"];

let pgList = ["backdoorman", "balllicker", "ballsack", "bondage", "boner",
    "bong", "boob", "boobies", "boobs", "booby", "boody", "boom", "boong",
    "biteme", "blackout", "blowjob", "boang", "bogan", "bohunk", "bollick",
    "bollock", "booty", "bootycall", "bountybar", "bra", "brea5t", "breast",
    "breastjob", "breastlover", "breastman", "brothel", "bullcrap", "bulldike",
    "bulldyke", "chav", "cherrypopper", "chickslick", "chink", "chinky",
    "choad", "chode", "clamdigger", "clamdiver","clit", "clitoris", "clogwog", "cocaine"];

let pg13List = ["ass", "assbagger", "assblaster", "assclown", "asscowboy",
    "asses", "assfuck", "assfucker", "asshat", "asshole", "assholes", "asshore", "assjockey", "asskiss", "asskisser",
    "assklown", "asslick", "asslicker", "asslover", "assman", "assmonkey", "assmunch", "assmuncher", "asspacker",
    "asspirate", "asspuppies", "assranger", "asswhore", "asswipe", "beastality", "beastial", "beastiality",
    "beatoff", "beat-off", "beatyourmeat", "bitch", "bitcher", "bitches", "bitchez", "bitchin",
    "bitching", "bitchslap", "bitchy", "butchbabes", "butchdike", "butchdyke", "butt", "buttbang",
    "butt-bang", "buttface", "buttfuck", "butt-fuck", "buttfucker", "butt-fucker", "buttfuckers", "butt-fuckers",
    "butthead", "buttman", "buttmunch", "buttmuncher", "buttpirate", "buttplug", "buttstain", "bullshit",
    "bumblefuck", "bumfuck", "bunga", "bunghole", "byatch", "cacker", "cameljockey", "cameltoe",
    "carpetmuncher", "carruth", "cock", "cockblock", "cockblocker", "cockcowboy", "cockfight", "cockhead",
    "cockknob", "cocklicker", "cocklover", "cocknob", "cockqueen", "cockrider", "cocksman", "cocksmith",
    "cocksmoker", "cocksucer", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocktail",
    "cocktease", "cocky", "cohee", "coon", "coondog", "cornhole", "crackpipev","crackwhore",
    "crack-whore", "crap", "crapola", "crapper", "crappy", "crotch", "crotchjockey", "crotchmonkey",
    "crotchrot", "dike", "dildo", "dingleberry", "dink", "dipshit", "dipstick", "doggiestyle", "doggystyle",
    "dong", "doodoo", "doo-doo", "dripdick", "drunk", "drunken", "dumb", "dumbass",
    "dumbbitch", "dumbfuck", "dyefly", "dyke", "easyslut", "eatballs", "eatme", "eatpussy",
    "ecstacy", "ejaculate", "ejaculated", "ejaculating", "ejaculation", "erect", "erection", "facefucker",
    "faeces", "fag", "fagging", "faggot", "fagot", "fannyfucker", "fckcum", "feces",
    "felatio", "felch", "felcher", "felching", "fellatio", "feltch", "feltcher", "feltching", "fetish"]

window.onload =  reloadPage;

//get restrctionList

function setRestrictionList(inputVal){


    switch (inputVal){
        case "G":
            restrictionList = gList + pgList + pg13List + rList;
            break;
        case "PG":
            break;
        case "PG-13":
            break;
        case "R":
            break;
        default:
            break;
    }

}

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
        sync_add_website(val);
    }

};

function addWord(){

    val = document.getElementById("bannedWord").value;
    // (Alex) add banned word to storage
    sync_add_word(val);

};

function addPointWebsite(){

    val = document.getElementById("websiteURLPoint").value;
    // (Alex) add banned word to storage
	if(checkValidURL()) {
        sync_add_website_points(val);
    }

};
//adds website when button is clicked

//changed to test

$('#addWebsite').on('click',function(){ addWebsite()});

//adds word when button clicked

$('#addWord').on('click',function(){ addWord() });

// adds a website buyable with points when clicked
$('#addWebsitePoint').on('click',function(){ addPointWebsite()});

//Removes a website when clicked on
$('#websiteTable').on('click' , function() {

    var tab = document.getElementById('websiteTable').getElementsByTagName('tbody')[0];
    var rows = tab.getElementsByTagName('tr');
    for ( i = 0; i < rows.length; i++) {
        rows[i].onclick = function() {
            var ans = confirm("Would you like to Delete this Website?");
            if(ans) {
                sync_remove_website(this.innerText);
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

//Removes a website from the Unlockable list if clicked
$('#websiteTablePoint').on('click' , function() {

    var tab = document.getElementById('websiteTablePoint').getElementsByTagName('tbody')[0];
    var rows = tab.getElementsByTagName('tr');
    for ( i = 0; i < rows.length; i++) {
        rows[i].onclick = function() {
            var ans = confirm("Would you like to Delete this Website?");
            if(ans) {
                sync_remove_website_point(this.innerText);
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
        let words = result['bad_words'];
        console.log('current words are ' + words);


        words.push(word);
        chrome.storage.sync.set({'bad_words': words}, function(){});
        console.log('new words are ' + words);
        reloadPage();
    })
}



function sync_add_website(website) {
    chrome.storage.sync.get('bad_websites', function(result) {
        let webs = result['bad_websites'];
        console.log('current websites are ' + webs);
        if(website.charAt(0)!= 'h' ){
            website = "https://" + website;
        }

        webs.push(website);


        chrome.storage.sync.set({'bad_websites': webs}, function(){});
        console.log('new websites are ' + webs);
        reloadPage();
    })
}

//adds website bought with points
function sync_add_website_points(website){
	chrome.storage.sync.get('point_websites', function(result) {
        let webs = result['point_websites'];
        console.log('current websites are ' + webs);
        if(website.charAt(0)!= 'h' ){
            website = "https://" + website;
        }

        webs.push(website);


        chrome.storage.sync.set({'point_websites': webs}, function(){});
        console.log('new websites are ' + webs);
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
            words.splice(pos, 1);
        }
        chrome.storage.sync.set({'bad_words': words}, function(){});
        console.log('new words are ' + words);
        reloadPage();
    })
}


function sync_remove_website(website) {
    chrome.storage.sync.get('bad_websites', function(result) {
        let websites = result['bad_websites']
        console.log('current websites are ' + websites)
        let pos = websites.indexOf(website)
        if (pos != -1) {
            websites.splice(pos, 1)
        }
        chrome.storage.sync.set({'bad_websites': websites}, function(){})
        console.log('new websites are ' + websites)
        reloadPage();
    })
}

//remove website unlockable with points
function sync_remove_website_point(website) {
    chrome.storage.sync.get('point_websites', function(result) {
        let websites = result['point_websites']
        console.log('current websites are ' + websites)
        let pos = websites.indexOf(website)
        if (pos != -1) {
            websites.splice(pos, 1)
        }
        chrome.storage.sync.set({'point_websites': websites}, function(){})
        console.log('new websites are ' + websites)
        reloadPage();
    })
}

function reloadPage() {

    $('#wordTable tbody').empty();
    chrome.storage.sync.get('bad_words', function (result) {
        let words = result['bad_words'];
        words.forEach(function (word) {
            $("#wordTable tbody").append(
                "<tr>" +
                "<td>" + word + "</td>>" +
                "</tr>"
            )

        })
    });

    $('#websiteTable tbody').empty();
    chrome.storage.sync.get('bad_websites', function (result) {
        let websites = result['bad_websites'];
        websites.forEach(function(website){
            $("#websiteTable tbody").append(
                "<tr>" +
                "<td>" + website + "</td>>" +
                "</tr>"
            );
        })
    });

	$('#websiteTablePoint tbody').empty();
    chrome.storage.sync.get('point_websites', function (result) {
        let pwebsite = result['point_websites'];
        pwebsite.forEach(function (pwebsites) {
            $("#websiteTablePoint tbody").append(
                "<tr>" +
                "<td>" + pwebsites + "</td>>" +
                "</tr>"
            )

        })
    });

}






//function to load pages with correct tab
