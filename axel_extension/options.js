
/*
*
*  @param val - the value being inserted into the table
*  @param wTable - the table being inserted into
*
 */

let val;
var currentLevel = " ";
let restrictionWordList = [];
let restrictionWebsiteList = [];

let gWordList = ["crap","abbo", "abo","abortion", "abuse", "addict", "addicts",
    "alligatorbait", "anal", "analannie", "analsex", "angie", "anus", "aroused",
    "arse", "arsehole", "banging", "bastard", "bazongas", "bazooms", "beaner",
    "bestial", "bestiality", "bi", "biatch", "bicurious", "bigass",
    "bigbastard", "bigbutt", "bisexual", "bi-sexual", "christ",
    "coitus", "condom", "fart", "farted", "farting", "farty", "fat", "fatso",
    "givehead", "glazeddonut"];

let pgWordList = ["backdoorman", "balllicker", "ballsack", "bondage", "boner",
    "bong", "boob", "boobies", "boobs", "booby", "boody", "boom", "boong",
    "biteme", "blackout", "blowjob", "boang", "bogan", "bohunk", "bollick",
    "bollock", "booty", "bootycall", "bountybar", "bra", "brea5t", "breast",
    "breastjob", "breastlover", "breastman", "brothel", "bullcrap", "bulldike",
    "bulldyke", "chav", "cherrypopper", "chickslick", "chink", "chinky",
    "choad", "chode", "clamdigger", "clamdiver","clit", "clitoris", "clogwog", "cocaine"];

let pg13WordList = ["shit","ass", "assbagger", "assblaster", "assclown", "asscowboy",
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
    "felatio", "felch", "felcher", "felching", "fellatio", "feltch", "feltcher", "feltching", "fetish"];

let rWordList= ["badfuck", "cum", "cumbubble", "cumfest", "cumjockey", "cumm", "cummer",
    "cumming", "cumquat", "cumqueen", "cumshot", "cunilingus", "cunillingus", "cunn",
    "cunnilingus", "cunntt", "cunt", "cunteyed", "cuntfuck", "cuntfucker", "cuntlick", "cuntlicker",
    "cuntlicking", "cuntsucker", "datnigga", "deapthroat", "devilworshipper", "dick",
    "dickbrain", "dickforbrains", "dickhead", "dickless", "dicklick", "dicklicker", "dickman",
    "dickwad", "dickweed", "fastfuck", "fatass", "fatfuck", "fatfucker", "fingerfuck", "fingerfucked",
    "fingerfucker", "fingerfuckers", "fingerfucking", "fister", "fistfuck", "fistfucked",
    "fistfucker", "fistfucking", "fisting", "flange", "flasher", "flatulence", "floo", "flydie", "flydye",
    "fok", "fondle", "footaction", "footfuck", "footfucker", "footlicker", "footstar", "foreskin", "fornicate", "foursome",
    "fourtwenty", "fraud", "freakfuck", "freakyfucker", "freefuck", "fu", "fubar", "fuc", "fucck", "fuck",
    "fucka", "fuckable", "fuckbag", "fuckbuddy", "fucked", "fuckedup", "fucker", "fuckers", "fuckface",
    "fuckfest", "fuckfreak", "fuckfriend", "fuckhead", "fuckher", "fuckin", "fuckina", "fucking", "fuckingbitch", "fuckinnuts",
    "fuckinright", "fuckit", "fuckknob", "fuckme", "fuckmehard", "fuckmonkey", "fuckoff", "fuckpig", "fucks", "fucktard",
    "fuckwhore", "fuckyou", "fudgepacker", "fugly", "fuk", "fuks", "funeral", "funfuck", "fuuck", "gangbang", "gangbanged",
    "gangbangergatorbait", "gay", "gaymuthafuckinwhore", "gaysex"];

let gWebsiteList = ["https://www.youtube.com"];
let pgWebsiteList = ["https://www.reddit.com"];
let pg13WebsiteList = ["https://www.chatroulette.com"];
let rWebsiteList = ["https://www.adultswim.com"];


window.onload =  reloadPage;


function setRestrictionList(inputVal){

    switch (inputVal){
        case "G":
            restrictionWordList = [];
            restrictionWordList = restrictionWordList.concat(gWordList);
            restrictionWordList = restrictionWordList.concat(pgWordList)
            restrictionWordList = restrictionWordList.concat(pg13WordList);
            restrictionWordList = restrictionWordList.concat(rWordList);

            restrictionWebsiteList = [];
            restrictionWebsiteList = restrictionWebsiteList.concat(gWebsiteList);
            restrictionWebsiteList = restrictionWebsiteList.concat(pgWebsiteList);
            restrictionWebsiteList = restrictionWebsiteList.concat(pg13WebsiteList);
            restrictionWebsiteList = restrictionWebsiteList.concat(rWebsiteList);


            break;
        case "PG":
            restrictionWordList = [];
            restrictionWordList = restrictionWordList.concat(pgWordList)
            restrictionWordList = restrictionWordList.concat(pg13WordList);
            restrictionWordList = restrictionWordList.concat(rWordList);

            restrictionWebsiteList = [];
            restrictionWebsiteList = restrictionWebsiteList.concat(pgWebsiteList);
            restrictionWebsiteList = restrictionWebsiteList.concat(pg13WebsiteList);
            restrictionWebsiteList = restrictionWebsiteList.concat(rWebsiteList);
            break;
        case "PG-13":
            restrictionWordList = [];
            restrictionWordList = restrictionWordList.concat(pg13WordList);
            restrictionWordList = restrictionWordList.concat(rWordList);

            restrictionWebsiteList = [];
            restrictionWebsiteList = restrictionWebsiteList.concat(pg13WebsiteList);
            restrictionWebsiteList = restrictionWebsiteList.concat(rWebsiteList);
            break;
        case "R":
            restrictionWordList = rWordList;
            restrictionWebsiteList = rWebsiteList;
            break;
        default:
            restrictionWordList= [];
            restrictionWebsiteList = [];
            break;
    };
    chrome.storage.sync.set({'restrictionWordList': restrictionWordList}, function(){});
    chrome.storage.sync.set({'restrictionWebsiteList': restrictionWebsiteList}, function(){});




    reloadPage();
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

//when restrction level changes
$('#restrictionLevel').change(function(){
  $("#restrictionLevel option:selected").each(function(){
     var inputVal = $(this).text();
     currentLevel = $(this).text();
     setRestrictionList(inputVal);
    });

})

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
        var words = result['bad_words'];
        restrictionWordList.forEach(function(w){
            words.push(w)
        });
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
        var websites = result['bad_websites'];

        restrictionWebsiteList.forEach(function(w){
            websites.push(w)
        });
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


//add profile functionality
//add button to add profile
//saves current wordList, websiteList, restrictionSetting, name
//store in array
function addProfile() {
    var websites, words;
    chrome.storage.sync.get('bad_websites', function (result) {
        websites = result['bad_websites'];
    });

    chrome.storage.sync.get('bad_words', function (result) {
        words = result['bad_words'];
    });

    var profile = {
        name: "John",
        wordList: words,
        websiteList: websites,
        restrictionLevel: currentLevel
    };

    chrome.storage.sync.get('profileList', function(result) {
        let profiles = result['profileList'];
        profiles.push(profile);
        chrome.storage.sync.set({'profileList': profiles}, function(){});
    });

}

