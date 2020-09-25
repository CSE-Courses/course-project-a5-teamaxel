// This documents purpose is for the use of javascript functionality.
// It enables things such as switching between buttons and Tabs.
//Furture implementations may also go inside of this file

//Detailed below is what allows buttons to react to being clicked

//Implements an event listener to the pop up itself
document.addEventListener('DOMContentLoaded', function(){

// Declaration of variables for the admin and child tab object directly
	var admin = document.getElementById("Admin");
	var child = document.getElementById("default");

//		The next three lines make it so Admin Options does not appear 
//		Upon the intial load of the extension
	var childB = document.getElementById("Admin Mode");
	childB.style.display = "none";
	var pass = document.getElementById("Pre-Admin Mode");
	pass.style.display = "none";
	hightlightCurrentTab(child, admin);

//		The below section Allows for Switching to the Child Mode Tab.
//		It Controls the buttons appearing when clicked along
//		with the removal of unwanted buttons	

child.addEventListener("click",function(){
	var adminB = document.getElementById("Admin Mode");
	adminB.style.display = "none";
	var pass = document.getElementById("Pre-Admin Mode");
	pass.style.display = "none";
	var childB = document.getElementById("Child Mode");
	childB.style.display = "block";
	hightlightCurrentTab(child, admin);
});

//		The below section Allows for Switching to the Admin Mode Tab.
//		It Controls the buttons appearing when clicked along
//		with the removal of unwanted buttons

admin.addEventListener("click", function(){
	//blanks out child mode
	var childB = document.getElementById("Child Mode");
	childB.style.display = "none";

	//opens password input prompt
	var passPage = document.getElementById('Pre-Admin Mode');
	passPage.style.display= "block";
	var entPass = document.getElementById('enterPassword');

	entPass.addEventListener('click', function(){
		passPage.style.display ='none';
		var adminB = document .getElementById("Admin Mode");
		adminB.style.display = "block";

	})


	
})

	// Action Listener for when the admin button is clicked
	//opens the admin options page
var adminOptions = document.getElementById("Admin Options");
adminOptions.addEventListener("click", function(){
	chrome.runtime.openOptionsPage();
})


});
	var adminB = document .getElementById("Admin Mode");
	adminB.style.display = "block";
	hightlightCurrentTab(admin, child);

	
//		The following seciton below is a function delcaration that hightlights 
//		The first parameter (x) in pink and the second (y) in dark gray
	function hightlightCurrentTab(x ,y){
		x.style.backgroundColor = "pink";
		y.style.backgroundColor = "#A4A4A4";
	}
