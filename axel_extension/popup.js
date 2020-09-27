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

//		The below section Allows for Switching to the Child Mode Tab.
//		It Controls the buttons appearing when clicked along
//		with the removal of unwanted buttons	
var child = document.getElementById("default");
child.addEventListener("click",function(){
	var adminB = document.getElementById("Admin Mode");
	adminB.style.display = "none";
	var childB = document.getElementById("Child Mode");
	childB.style.display = "block";
});

//		The below section Allows for Switching to the Admin Mode Tab.
//		It Controls the buttons appearing when clicked along
//		with the removal of unwanted buttons
var admin = document.getElementById("Admin");
admin.addEventListener("click", function(){
	var childB = document.getElementById("Child Mode");
	childB.style.display = "none";
	var adminB = document .getElementById("Admin Mode");
	adminB.style.display = "block";
	
})

	// Action Listener for when the admin button is clicked
	//opens the admin options page
var adminOptions = document.getElementById("Admin Options");
adminOptions.addEventListener("click", function(){
	chrome.runtime.openOptionsPage();
})


});