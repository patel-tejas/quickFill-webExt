// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_RECORDING') {
    chrome.storage.local.set({ isRecording: true });
  } else if (message.type === 'STOP_RECORDING') {
    chrome.storage.local.set({ isRecording: false });
  }
});
