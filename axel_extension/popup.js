let changeColor = document.getElementById('changeColor');
let options = document.getElementById('options');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

//Grabs whether the user is a first time admin(just installed)
chrome.storage.sync.get('first_time', function(result){
  console.log('Value currently is '+ result.key);
  options.setAttribute('value', result.key);
  // if(1){
  //   chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
  // }
});

var k = 0;
//change color of site
changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
}
//click options button, change front end of popup GUI based on past use
options.onclick = function(element){
  let test = element.target.value;
  // const align = options.getAttribute('value');
    if(test == 'true'){
      chrome.browserAction.setPopup({popup: 'popup_create_pass.html'});
    }
    else{
      chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
    }
}
  



