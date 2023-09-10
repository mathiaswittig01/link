browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: "sampleContextMenu",
      title: "Sample Context Menu",
      contexts: ["selection"],
    });
  });

  

// This will run when a bookmark is created.
browser.bookmarks.onCreated.addListener(() => {
    // do something
    console.log("ehy")
});
  