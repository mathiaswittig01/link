// chrome.contextMenus.create({
//   id: "myContextMenu",
//   title: "Draw White Square",
//   contexts: ["page"],
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "myContextMenu") {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: () => {
//         chrome.runtime.sendMessage({ action: "createWhiteSquare" });
//       },
//     });
//   }
// });



chrome.contextMenus.create({
  id: 'saveLink',
  title: 'Save Link',
  contexts: ['page'],
});




chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveLink') {



    console.log("click");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const currentTitle = currentTab.title;
  
      save(currentTitle,"");
    });

    // const uniqueID = "myNotification_" + Date.now();
    // chrome.notifications.create('uniqueID', {
    //   type: 'basic',
    //   iconUrl: 'icons/icon_128.png',
    //   title: 'Test Title',
    //   message: 'Test Message',
    // });

    // chrome.notifications.create('saveLinkNotification', {
    //   type: 'basic',
    //   iconUrl: 'icons/icon_128.png',
    //   title: 'Save this link?',
    //   message: 'Click to save the link.',
    // }, (notificationId) => {
    //   if (chrome.runtime.lastError) {
    //     console.error(chrome.runtime.lastError);
    //   } else {
    //     console.log('Notification shown', notificationId);
    //   }
    // });
  }
});




// chrome.notifications.onClicked.addListener((notificationId) => {
//   if (notificationId === 'saveLinkNotification') {

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const currentTab = tabs[0];
//       const currentTitle = currentTab.title;
  
//       save(currentTitle,"");
//     });


//   }
// });



const version = 1;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download") {

      fileName = message.fileName;
      comment = message.data.comment;

      save(fileName,comment);
      
  }
});


function save(fileName,comment){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const currentUrl = currentTab.url;
    const currentTitle = currentTab.title;

    const currentDate = new Date();
    const utcDateTimeString = currentDate.toISOString();

    const fileContent = {
      title: currentTitle,
      url: currentUrl,
      comment: comment,
      date: utcDateTimeString,
      version: version,
    };

    

    // Convert JSON object to JSON string
    const jsonString = JSON.stringify(fileContent, null, 2);

    

    // Get the link string to save.
    const linkString = "https://www.google.com";

    // Encode the link string.
    const encodedLinkString = encodeURIComponent(linkString);

    // Create a data URL.
    const dataUrl = "data:text/plain;charset=utf-8," + encodedLinkString;

    // Download the file.
    chrome.downloads.download({
      filename: "my-file.link",
      url: dataUrl,
      saveAs: true
    });


    // chrome.downloads.download({
    //   filename: "my-file.json",
    //   url: "data:application/json;charset=utf-8," + encodeURIComponent(jsonString),
    //   saveAs: true
    // });
    


    // // Create Blob URL
    // const url = URL.createObjectURL(blob);

    // // Use Chrome downloads API to download the Blob
    // chrome.downloads.download({
    //   url: url,
    //   filename: "test",
    //   // saveAs: true,
    // }, function(downloadId) {
    //   // Optional: Handle the download ID here
    // });

    // // Optional: Release Blob URL
    // URL.revokeObjectURL(url);



    // chrome.downloads.download(
    //   {
    //     url: url,
    //     filename: fileName + ".link",
    //     saveAs: true,
    //   },
    //   (downloadId) => {
    //     if (chrome.runtime.lastError) {
    //       console.error(`Download failed: ${chrome.runtime.lastError}`);
    //     } else {
    //       console.log(`Started download: ${downloadId}`);
    //     }
    //     URL.revokeObjectURL(url);
    //   }
    // );


  });
}