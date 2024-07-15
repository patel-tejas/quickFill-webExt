// public/content.js

document.addEventListener('input', (event) => {
    const form = event.target.closest('form');
    if (form) {
      const formData = new FormData(form);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
  
      const url = location.href;
      
      chrome.storage.local.set({ [url]: formObject }, () => {
        console.log('Form data saved for', url);
      });
    }
  });
  