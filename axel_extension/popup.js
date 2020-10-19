// This documents purpose is for the use of javascript functionality.
// It enables things such as switching between buttons and Tabs.
//Furture implementations may also go inside of this file

//Detailed below is what allows buttons to react to being clicked
//		The following seciton below is a function delcaration that hightlights 
//		The first parameter (x) in pink and the second (y) in dark gray
function hightlightCurrentTab(x ,y){
  x.style.backgroundColor = "pink";
  y.style.backgroundColor = "#A4A4A4";
}

//    Call to switch display to Admin Mode
function displayAdminMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
  adminDisplay.style.display = "block";
  childDisplay.style.display = "none";
  signInDisplay.style.display = "none";
  signUpDisplay.style.display = "none";
  hightlightCurrentTab(document.getElementById("Admin"),document.getElementById("default"));
  return;
}

//    Call to switch display to Child Mode
function displayChildMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
  adminDisplay.style.display = "none";
  childDisplay.style.display = "block";
  signInDisplay.style.display = "none";
  signUpDisplay.style.display = "none";
  hightlightCurrentTab(document.getElementById("default"),document.getElementById("Admin"));
  return;
}

//    Call to switch display to Create Password Mode (new admin)
function displaySignUpMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
  adminDisplay.style.display = "none";
  childDisplay.style.display = "none";
  signInDisplay.style.display = "none";
  signUpDisplay.style.display = "block";
  hightlightCurrentTab(document.getElementById("Admin"),document.getElementById("default"));
  return;
}

//    *******broken******
// //    Call to switch display to Sign In Password Mode (returning admin)
// function displaySignIpMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
//   adminDisplay.style.display = "none";
//   childDisplay.style.display = "none";
//   signInDisplay.style.display = "block";
//   signUpDisplay.style.display = "none";
//   return;
// }

//Implements an event listener to the pop up itself
document.addEventListener('DOMContentLoaded', function(){
	
  //		The next six lines make it so "Admin Options", "sign_in", and
  //    "create_pass" do not appear upon the intial load of the extension
    var childB = document.getElementById("Admin Mode");
    var sign_in = document.getElementById("sign_in");
    var create_pass = document.getElementById("create_pass");
    var sign_up_form = document.getElementById("new_pass");
    var sign_in_form = document.getElementById("entered_pass");
    var adminOptions = document.getElementById("Admin Options");
    hightlightCurrentTab(document.getElementById("default"),document.getElementById("Admin"));
    const log = document.getElementById('log');
    childB.style.display = "none";
    sign_in.style.display = "none";
    create_pass.style.display = "none";
    // hightlightCurrentTab(childB, admin);
    sign_up_form.reset();
    sign_in_form.reset();  
  /************************************************************************/
  //		The below section Allows for Switching to the Child Mode Tab.
  //		It Controls the buttons appearing when clicked along
  //		with the removal of unwanted buttons.	
  //    sign_in and create_pass are added within this event listener in the event that
  //    a child/admin clicks the "Child Mode" button while within 
  //    the create/enter password phase. sign_up_form and sign_in_form get reset
  //    so that characters input into those respective text fields do not stay 
  //    inside the text field if Child Mode is clicked.
  /************************************************************************/
  var child = document.getElementById("default");
  child.addEventListener("click",function(){
    var adminB = document.getElementById("Admin Mode");
    adminB.style.display = "none";
    var childB = document.getElementById("Child Mode");
    displayChildMode(adminB, childB, sign_in, create_pass);
    log.textContent = "";
    sign_up_form.reset();
    sign_in_form.reset();
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
 
  /*    admin.addEventListener()
    *    "element.target. value" grabs the value we stored in admin  
    *    and store the value in the variable "firstTime".
    *    From here, we check if our admin is a first time admin. 
    *    If firstTime == 'true', we ask them to create a password, hide all
    *    <div> elements except "create_pass" in "popup.html", and change the value
    *    of the key 'first_time' to 'false' in storage. Once the new password is entered into
    *    the text field and submitted, we are routed to Admin Mode.
    *    Else, we ask them to enter the established password and hide all <div>
    *    elements except "sign_in" in "popup.html". Once the password is entered into the
    *    text field and submitted, we enter Admin Mode.
    * 
    *    In the near future, the if statement will be updated with a 
    *    method to store the created password. The else statement will be
    *    updated with a method to check if the entered password matches 
    *    the password stored in our database.
  */

  admin.addEventListener("click", function(element){
    let firstTime = element.target.value;
    var childB = document.getElementById("Child Mode");
    var adminB = document .getElementById("Admin Mode");
    var sign_in = document.getElementById("sign_in");
    var create_pass = document.getElementById("create_pass");
    hightlightCurrentTab(document.getElementById("Admin"),document.getElementById("default"));

    //  is this a first time admin
    if(firstTime == 'true'){                //  first time admin
      displaySignUpMode(adminB, childB, sign_in, create_pass);
      //  if submit button is hit, store entered password in storage and move into Admin Mode
      sign_up_form.addEventListener("submit", function(event){
        //sets first_time admin to false
        chrome.storage.sync.set({first_time: 'false'}, function(){
          console.log('Value is set to ' + false);
        });
        firstTime = 'false';
        admin.setAttribute('value', 'false');
        displayAdminMode(adminB, childB, sign_in, create_pass);
        sign_up_form.reset();
        event.preventDefault();
        //  grabs typed desired password
        /**broken entered password store */
      //   var desired_pass = "moonpies";
      // //  var desired_pass = document.getElementById('creatingPass').value;
      //   //  stores password entered into chrome storage
      //   chrome.storage.sync.set({password:desired_pass }, function(){
      //   // chrome.storage.sync.set({password:'aew;kjf;adf' }, function(){
      //     console.log('Password entered to storage');
      //   });
      } );  //end event listener
      
    } //end if
    else{                                 //returning admin
      childB.style.display = "none";
      adminB.style.display = "none";
      create_pass.style.display = "none";
      sign_in.style.display = "block";
      log.textContent = "";
      // displaySignInMode(adminB, childB, sign_in, create_pass);

      //sign in using initially established password
      sign_in_form.addEventListener("submit", function(event){
        //  grabs password input in text field
        var checkPass = document.getElementById('unique').value;
        
        /** broken password check*/
        /*// var passwords_match = false;
        // chrome.storage.sync.get(['password'], function(result){
        //   console.log('Password grabbed from storage');
        //   // stored_pass = result.password;
        //   log.textContent = result.password;
        //   // log.textContent = "tried grabbing, here we are";
        //   if(checkPass == result.password){
        //     passwords_match = true;
        //     // log.textContent = result.password;
        //   }
        //  });
        */
        // if(!passwords_match){
        if(checkPass != "meowmeow"){
          log.textContent = "incorrect password, please try again";
          sign_in_form.reset();
          event.preventDefault();
        }
        //  entered password == "meowmeow", we move into Admin Mode
        else{ 
          //clears password input
          sign_in_form.reset();
          //resets log (text that states "incorrect password, please try again")
          log.textContent = "";
          // //enters admin mode
          displayAdminMode(adminB, childB,sign_in, create_pass);
          event.preventDefault();
        }
      } );
    }
  })// end admin

  /********************************************************************** */
  //		The below section Allows for Switching to Admin Options .
  //    Action Listener for when the admin button is clicked
  //    opens the admin options page
  /********************************************************************** */
	
  adminOptions.addEventListener("click", function(){
    chrome.runtime.openOptionsPage();
  });
  
});
  