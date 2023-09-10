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
    const jsonString = JSON.stringify(message.data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    try {
      const downloadId = await browser.downloads.download({
        url: url,
        filename: 'sample.json',
        saveAs: true
      });
      console.log(`Started saving link: ${downloadId}`);
    } catch (error) {
      console.error(`Saving Link failed: ${error}`);
    } finally {
      URL.revokeObjectURL(url);
    }
  }
});

