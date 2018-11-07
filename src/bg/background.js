chrome.contextMenus.create({
  title: "Edit code snippet",
  contexts: ["all"],
  onclick: (info) => {
    chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "queryContextElement" });
    });
  }
});
