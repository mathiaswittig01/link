chrome.contextMenus.create({
  id: 'saveLink',
  title: 'Save Link',
  contexts: ['page'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveLink') {
    chrome.notifications.create('saveLinkNotification', {
      type: 'basic',
      iconUrl: 'icons/icon_128.png',
      title: 'Save this link?',
      message: 'Click to save the link.',
    });
  }
});


chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId === 'saveLinkNotification') {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const currentTitle = currentTab.title;
  
      save(currentTitle,"");
    });


  }
});



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

    const jsonString = JSON.stringify(fileContent, null, 2);
    const blob = new Blob([jsonString], { type: "application/octet-stream" });
          const url = URL.createObjectURL(blob);

    chrome.downloads.download(
      {
        url: url,
        filename: fileName + ".link",
        saveAs: true,
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error(`Download failed: ${chrome.runtime.lastError}`);
        } else {
          console.log(`Started download: ${downloadId}`);
        }
        URL.revokeObjectURL(url);
      }
    );
  });
}