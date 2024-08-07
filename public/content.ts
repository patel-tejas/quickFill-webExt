// public/content.ts
let isRecording = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'START_RECORDING') {
        let isRecording = true;
    } else if (message.type === 'STOP_RECORDING') {
        let isRecording = false;
    }
});

document.addEventListener('input', (event) => {

    if (!isRecording) return;

    const form = (event.target as Element)?.closest('form');
    if (form) {
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        const url = location.href;
        chrome.storage.local.get(['formData'], (result) => {
            const updatedFormData = { ...result.formData, [url]: formObject };
            chrome.storage.local.set({ formData: updatedFormData }, () => {
                console.log('Form data saved for', url);
            });
        });
    }
});
