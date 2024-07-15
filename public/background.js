// public/background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveFormData') {
      chrome.storage.local.set({ [message.url]: message.data }, () => {
        sendResponse({ status: 'success' });
      });
      return true; // Will respond asynchronously
    }   
  });
  