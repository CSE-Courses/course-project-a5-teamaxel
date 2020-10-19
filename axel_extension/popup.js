// This documents purpose is for the use of javascript functionality.
// It enables things such as switching between buttons and Tabs.
//Furture implementations may also go inside of this file

//Detailed below is what allows buttons to react to being clicked
//		The following seciton below is a function delcaration that hightlights 
//		The first parameter (x) in pink and the second (y) in dark gray

// (Alex) Set mode to "mode".
// Call with 'admin' after successful login.
// Call with 'child_view' after enterring child view.
// TODO: Call with 'child_context_clue_game' and 'child_educational_game'
// when those are implemented.
function sync_mode(mode) {  
  chrome.storage.sync.set(
    {'mode': mode},
    function() {
	    console.log('mode set to ' + mode)
    }
  )
}


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


  // (Alex) see function definition
  sync_mode('admin');

  return;
}

//    Call to switch display to Child Mode
function displayChildMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
  adminDisplay.style.display = "none";
  childDisplay.style.display = "block";
  signInDisplay.style.display = "none";
  signUpDisplay.style.display = "none";
  hightlightCurrentTab(document.getElementById("default"),document.getElementById("Admin"));

  // (Alex) see function definition
  sync_mode('child_view');

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

// //    Call to switch display to Sign In Password Mode (returning admin)
function displaySignInMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
  adminDisplay.style.display = "none";
  childDisplay.style.display = "none";
  signInDisplay.style.display = "block";
  signUpDisplay.style.display = "none";
  return;
}
// Call to display the saved state
function savedState(adminDisplay, childDisplay, signInDisplay, signUpDisplay){
  chrome.storage.sync.get(['mode'], function(result){
    if(result.mode == 'admin'){
      displayAdminMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay);
    }
    else{
      displayChildMode(adminDisplay, childDisplay, signInDisplay, signUpDisplay);
    }
    // console.log(result.mode.toString());
  });
}



//Implements an event listener to the pop up itself
document.addEventListener('DOMContentLoaded', function(){
	
  //		The next six lines make it so "Admin Options", "sign_in", and
  //    "create_pass" do not appear upon the intial load of the extension

    var childB = document.getElementById("Admin Mode");
    var child = document.getElementById("Child Mode");
    var sign_in = document.getElementById("sign_in");

	var Input_Points = document.getElementById("Input_Points");
  var create_pass = document.getElementById("create_pass");
  var sign_up_form = document.getElementById("new_pass");
  var sign_in_form = document.getElementById("entered_pass");
  var adminOptions = document.getElementById("Admin Options");
	var addPointsButton = document.getElementById("Add Points");
	var pointTab = document.getElementById("Input_Points");
	var points = document.getElementById("points");

  var pointSubmit = document.getElementById("Point_Submit");
    hightlightCurrentTab(document.getElementById("default"),document.getElementById("Admin"));
    const log = document.getElementById('log');
  const incorrect = document.getElementById('incorrect');
    childB.style.display = "none";
	Input_Points.style.display = "none";
    sign_in.style.display = "none";
    create_pass.style.display = "none";
  pointTab.style.display = "none";
  var admin = document.getElementById("Admin");
    //hightlightCurrentTab(childB, admin);
    sign_up_form.reset();
    sign_in_form.reset();  
  savedState(childB, child,sign_in, create_pass);

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
    pointTab.style.display = "none";
    points.style.display = "block";
    log.textContent = "";
    incorrect.textContent = "";
    sign_up_form.reset();
    sign_in_form.reset();
  });
  
  /********************************************************************** */
  //		The below section Allows for Switching to the Admin Mode Tab.
  //		It Controls the buttons appearing when clicked along
  //		with the removal of unwanted buttons
  /********************************************************************** */

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
  

 chrome.storage.sync.get(['pointTotal'], function(result){
	document.getElementById("pointTotal").innerHTML = result.pointTotal;
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
    *    When a password is created, it is stored in chrome storage and saved
    *    under the object 'password'. When asked to enter password to enter Admin Mode,
    *    previously created password gets grabbed from storage and is checked to see
    *    if the entered password equals the password stored.
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
	  points.style.display = "none";
      //  if submit button is hit, store entered password in storage and move into Admin Mode
      sign_up_form.addEventListener("submit", function(event){
        //sets first_time admin to false
        chrome.storage.sync.set({first_time: 'false'}, function(){
          console.log('Value is set to ' + false);
        });
        firstTime = 'false';
        admin.setAttribute('value', 'false');
        displayAdminMode(adminB, childB, sign_in, create_pass);
        pointTab.style.display = "none";
        points.style.display = "block";
        var desired_pass = document.getElementById('creatingPass').value;
        sign_up_form.reset();
        chrome.storage.sync.set({'password': desired_pass.toString() }, function(){
            console.log('Password entered to storage');
          }); 
        event.preventDefault();
      } );  //end event listener
      
    } //end if
    else{                                 //returning admin
      pointTab.style.display = "none";
      points.style.display = "none";
      log.textContent = "";
      displaySignInMode(adminB, childB, sign_in, create_pass);
      //sign in using initially established password
      sign_in_form.addEventListener("submit", function(event){
        //  grabs password input in text field
        var checkPass = document.getElementById('unique').value;
        var stored_pass = "";
        chrome.storage.sync.get(['password'], function(result){
          console.log('Password grabbed from storage');
          stored_pass = result.password;
          if(checkPass == stored_pass){
            displayAdminMode(adminB,childB,sign_in,create_pass);
            pointTab.style.display = "none";
            points.style.display = "block";
            event.preventDefault();
          }
          else{
            log.textContent = "incorrect password, please try again";
            sign_in_form.reset();
            event.preventDefault();
          }
         });
         event.preventDefault();
      } );
    }
  })// end admin

  /********************************************************************** */
  //		The below section Allows for Switching to Admin Options .
  //    Action Listener for when the admin button is clicked
  //    opens the admin options page
  /********************************************************************** */
	
  adminOptions.addEventListener("click", function(){
    chrome.tabs.create({ url: "options.html" });
  });
  
	addPointsButton.addEventListener("click",function(){
		childB.style.display = "none";
		pointTab.style.display = "block";
	});
	
	pointSubmit.addEventListener("click", function(){
	var childB = document.getElementById("Child Mode");
    var adminB = document .getElementById("Admin Mode");
    var sign_in = document.getElementById("sign_in");
    var create_pass = document.getElementById("create_pass");
	if(document.getElementById("point input").value == ""){
		incorrect.textContent = "Invalid Input";
	}
	else{
		displayAdminMode(adminB, childB, sign_in, create_pass);
		pointTab.style.display = "none";
		document.getElementById("pointTotal").innerHTML = parseInt(document.getElementById("pointTotal").innerHTML) + parseInt(document.getElementById("point input").value);
		var pointStorage = parseInt(document.getElementById("pointTotal").innerHTML);
		chrome.storage.sync.set({'pointTotal': pointStorage},function(){
			console.log('Points Total is Now ' + pointStorage);
		});
		incorrect.textContent = "";
	}
		event.preventDefault();
  });
});


// // (Alex) Set mode to "mode".
// // Call with 'admin' after successful login.
// // Call with 'child_view' after enterring child view.
// // TODO: Call with 'child_context_clue_game' and 'child_educational_game'
// // when those are implemented.
// function sync_mode(mode) {  
//   chrome.storage.sync.set(
//     {'mode': mode},
//     function() {
// 	    console.log('mode set to ' + mode)
//     }
//   )
// }
