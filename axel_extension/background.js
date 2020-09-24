chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({first_time: 'true'}, function(){
        console.log('Value is set to ' + true);

    });

});

