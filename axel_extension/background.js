/*  Upon installation of the chrome extension, a key-value mapping 
 *  {first_time: 'true'} is stored in chrome's storage. We grab this stored
 *  object in "popup.js".
 */

chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({first_time: 'true'}, function(){
        console.log('Value is set to ' + true);
    });
    chrome.storage.sync.set({state: 'child'}, function(){
        console.log('State intialized to Child Mode');
    })
    chrome.storage.sync.set({password:'initialpass'}, function(){
        console.log('Password intialized to: initialpass');
    })
});