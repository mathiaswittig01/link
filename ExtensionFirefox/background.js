// Create a context menu item
browser.contextMenus.create({
  id: "saveLink",
  title: "Save Link",
  contexts: ["all"], // Specify the context where the menu item should appear
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveLink") {
    saveLink();

  }
});


browser.commands.onCommand.addListener((command) => {
  if (command === "saveLink") {
    saveLink();
  }
});

function saveLink() {
  browser.browserAction.openPopup();
  
}



//actually save json file
browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === "download") {


    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const currentUrl = tabs[0].url;
      const currentTitle = tabs[0].title;

      const currentDate = new Date();
      const utcDateTimeString = currentDate.toISOString();


      fileContent = { 
        title: currentTitle, 
        url: currentUrl,
        note: message.data.note,
        date: utcDateTimeString
      }


      const jsonString = JSON.stringify(fileContent, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      browser.downloads.download({
        url: url,
        filename: message.fileName+'.link',
        saveAs: true
      })
      .then((downloadId) => {
        console.log(`Started download: ${downloadId}`);
        URL.revokeObjectURL(url);  // Revoke the blob URL
      })
      .catch((error) => {
        console.error(`Download failed: ${error}`);
        URL.revokeObjectURL(url);  // Revoke the blob URL
      });
    });

  }
});

// const jsonString = JSON.stringify(message.data, null, 2);
// const blob = new Blob([jsonString], { type: "application/json" });
// const url = URL.createObjectURL(blob);
// try {
//   const downloadId = await browser.downloads.download({
//     url: url,
//     filename: message.fileName+'.link',
//     saveAs: true
//   });
//   console.log(`Started saving link: ${downloadId}`);
// } catch (error) {
//   console.error(`Saving Link failed: ${error}`);
// } finally {
//   URL.revokeObjectURL(url);
// }