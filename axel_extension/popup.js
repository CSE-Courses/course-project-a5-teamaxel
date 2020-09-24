// let changeColor = document.getElementById('changeColor');
// let options = document.getElementById('options');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// //Grabs whether the user is a first time admin(just installed)
// chrome.storage.sync.get('first_time', function(result){
//   console.log('Value currently is '+ result.key);
//   options.setAttribute('value', result.key);
//   // if(1){
//   //   chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
//   // }
// });

// var k = 0;
// //change color of site
// changeColor.onclick = function(element) {
//     let color = element.target.value;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.executeScript(
//           tabs[0].id,
//           {code: 'document.body.style.backgroundColor = "' + color + '";'});
//     });
// }
// //click options button, change front end of popup GUI based on past use
// options.onclick = function(element){
//   let test = element.target.value;
//   // const align = options.getAttribute('value');
//     if(test == 'true'){
//       chrome.browserAction.setPopup({popup: 'popup_create_pass.html'});
//     }
//     else{
//       chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
//     }
// }
  



// This documents purpose is for the use of javascript functionality.
// It enables things such as switching between buttons and Tabs.
//Furture implementations may also go inside of this file

//Detailed below is what allows buttons to react to being clicked

//Implements an event listener to the pop up itself
document.addEventListener('DOMContentLoaded', function(){
	
	
  //		The next two lines make it so Admin Options does not appear 
  //		Upon the intial load of the extension
    var childB = document.getElementById("Admin Mode");
    childB.style.display = "none";

  //    Applied logic seen above to hide Password Prompt
    var passB = document.getElementById("sign_in");
    var passC = document.getElementById("create_pass");
    passB.style.display = "none";
    passC.style.display = "none";
  
  //		The below section Allows for Switching to the Child Mode Tab.
  //		It Controls the buttons appearing when clicked along
  //		with the removal of unwanted buttons	
  var child = document.getElementById("default");
  child.addEventListener("click",function(){
    var adminB = document.getElementById("Admin Mode");
    adminB.style.display = "none";
    var childB = document.getElementById("Child Mode");
    childB.style.display = "block";
    passB.style.display = "none";
  });
  
  //		The below section Allows for Switching to the Admin Mode Tab.
  //		It Controls the buttons appearing when clicked along
  //		with the removal of unwanted buttons
  var admin = document.getElementById("Admin");

  chrome.storage.sync.get('first_time', function(result){
    console.log('Value currently is '+ result.first_time);
    admin.setAttribute('value', result.first_time);
  });

  admin.addEventListener("click", function(element){
    let test = element.target.value;
    var childB = document.getElementById("Child Mode");
    var adminB = document .getElementById("Admin Mode");
    var passB = document.getElementById("sign_in");
    var create_pass = document.getElementById("create_pass");

      //  if a new admin, create password. else, enter established password
    if(test == 'true'){
      childB.style.display = "none";
      adminB.style.display = "none";
      create_pass.style.display = "block";
      passB.style.display = "none";
      chrome.storage.sync.set({first_time: 'false'}, function(){
        console.log('Value is set to ' + false);
      });
      element.target.value = 'false';
    }
    else{
      childB.style.display = "none";
      adminB.style.display = "none";
      create_pass.style.display = "none";
      passB.style.display = "block";
    }
  })

  //    This portion of code added to admin event listener checks if
  //    app is installed for the first time, and allows admin to create
  //    password.
  var submit = document.getElementById("submit");
  submit.addEventListener("click", function(){
    var childB = document.getElementById("Child Mode");
    var adminB = document .getElementById("Admin Mode");
    var passB = document.getElementById("sign_in");

    
    childB.style.display = "none";
    adminB.style.display = "block";
    passB.style.display = "none";
  } )

    });
  