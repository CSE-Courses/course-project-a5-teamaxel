// This documents purpose is for the use of javascript functionality.
// It enables things such as switching between buttons and Tabs.
//Furture implementations may also go inside of this file

//Detailed below is what allows buttons to react to being clicked

//Implements an event listener to the pop up itself
document.addEventListener('DOMContentLoaded', function(){
	
	
  //		The next six lines make it so "Admin Options", "sign_in", and
  //    "create_pass" do not appear upon the intial load of the extension
    var childB = document.getElementById("Admin Mode");
    var sign_in = document.getElementById("sign_in");
    var create_pass = document.getElementById("create_pass");
    childB.style.display = "none";
    sign_in.style.display = "none";
    create_pass.style.display = "none";
  
  /************************************************************************/
  //		The below section Allows for Switching to the Child Mode Tab.
  //		It Controls the buttons appearing when clicked along
  //		with the removal of unwanted buttons	
  //    passB and passC are added within this event listener in the event that
  //    a child/admin clicks the "Child Mode" button while within 
  //    the create/enter password phase
  /************************************************************************/
  var child = document.getElementById("default");
  child.addEventListener("click",function(){
    var adminB = document.getElementById("Admin Mode");
    adminB.style.display = "none";
    var childB = document.getElementById("Child Mode");
    childB.style.display = "block";
    sign_in.style.display = "none";
    create_pass.style.display = "none";
  });
  
  /********************************************************************** */
  //		The below section Allows for Switching to the Admin Mode Tab.
  //		It Controls the buttons appearing when clicked along
  //		with the removal of unwanted buttons
  /********************************************************************** */
  var admin = document.getElementById("Admin");

  /*    chrome.storage.sync.get()
   *    Grabs the key 'first_time' from storage (initialized in background.js) 
   *    and stores the object in the result parameter. 
   *    Then, we set the value of admin to the value stored in result
   *    (this is accessed by result.first_time).
   *    Works with 'var admin' declared above this comment block.
  */

  chrome.storage.sync.get('first_time', function(result){
    console.log('Value currently is '+ result.first_time);
    admin.setAttribute('value', result.first_time);
  });

  /********************************************************************** */

      /*    admin.addEventListener()
       *    "element.target. value" grabs the value we stored in admin  
       *    and store the value in the variable "firstTime".
       *    From here, we check if our admin is a first time admin. 
       *    If value == 'true', we ask them to create a password, hide all
       *    <div> elements except "create_pass" in "popup.html", and change the value
       *    of the key 'first_time' to 'false' in storage. 
       *    Else, we ask them to enter the established password and hide all <div>
       *    elements except "sign_in" in "popup.html". 
       * 
       *    In the near future, the if statement will be updated with a 
       *    method to store the created password. The else statement will be
       *    updated with a method to check if the entered password matches 
       *    the password stored in our database.
      */

  /********************************************************************** */


  admin.addEventListener("click", function(element){
    let firstTime = element.target.value;
    var childB = document.getElementById("Child Mode");
    var adminB = document .getElementById("Admin Mode");
    var sign_in = document.getElementById("sign_in");
    var create_pass = document.getElementById("create_pass");

    if(firstTime == 'true'){
      childB.style.display = "none";
      adminB.style.display = "none";
      create_pass.style.display = "block";
      sign_in.style.display = "none";
      chrome.storage.sync.set({first_time: 'false'}, function(){
        console.log('Value is set to ' + false);
      });
      // element.target.value = 'false';
    }
    else{
      childB.style.display = "none";
      adminB.style.display = "none";
      create_pass.style.display = "none";
      sign_in.style.display = "block";
    }
  })

  /********************************************************************** */
  /*    If the submit button within the password phase is clicked,
   *    take admin to admin page.
   *    ***********(CURRENTLY NOT FUNCTIONAL)**************
  */
 /********************************************************************** */
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
  