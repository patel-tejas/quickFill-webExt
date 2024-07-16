import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [formDataList, setFormDataList] = useState<{ url: string; formData: any }[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Fetch all stored form data and recording state from chrome storage
    chrome.storage.local.get(['formData', 'isRecording'], (result) => {
      const formDataEntries = Object.entries(result.formData || {}).filter(([key, _]) => key.startsWith('http'));
      const formattedFormData = formDataEntries.map(([url, formData]) => ({ url, formData }));
      setFormDataList(formattedFormData);
      setIsRecording(result.isRecording || false);
    });
  }, []);

  const handleDelete = (url: string) => {
    // Remove form data from chrome storage
    chrome.storage.local.get(['formData'], (result) => {
      const updatedFormData = { ...result.formData };
      delete updatedFormData[url];

      chrome.storage.local.set({ formData: updatedFormData }, () => {
        // Update the state to reflect the deletion
        setFormDataList((prevList) => prevList.filter((entry) => entry.url !== url));
      });
    });
  };

  const handleRecord = () => {
    // Toggle recording state
    const newRecordingState = !isRecording;
    setIsRecording(newRecordingState);

    chrome.storage.local.set({ isRecording: newRecordingState });

    // Send a message to the content script to start or stop recording
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, { type: newRecordingState ? 'START_RECORDING' : 'STOP_RECORDING' });
      }
    });
  };

  return (
    <div className='popup-container w-[500px] min-h-[400px] max-h-[600px] overflow-visible bg-white text-black'>
      <div className='flex gap-1 bg-blue-700 py-5 items-center justify-center'>

        <h1 className='text-xl font-bold  text-white text-center '>QuickFill</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"orange"}>
          <path d="M8.62814 12.6736H8.16918C6.68545 12.6736 5.94358 12.6736 5.62736 12.1844C5.31114 11.6953 5.61244 11.0138 6.21504 9.65083L8.02668 5.55323C8.57457 4.314 8.84852 3.69438 9.37997 3.34719C9.91142 3 10.5859 3 11.935 3H14.0244C15.6632 3 16.4826 3 16.7916 3.53535C17.1007 4.0707 16.6942 4.78588 15.8811 6.21623L14.8092 8.10188C14.405 8.81295 14.2029 9.16849 14.2057 9.45952C14.2094 9.83775 14.4105 10.1862 14.7354 10.377C14.9854 10.5239 15.3927 10.5239 16.2074 10.5239C17.2373 10.5239 17.7523 10.5239 18.0205 10.7022C18.3689 10.9338 18.5513 11.3482 18.4874 11.7632C18.4382 12.0826 18.0918 12.4656 17.399 13.2317L11.8639 19.3523C10.7767 20.5545 10.2331 21.1556 9.86807 20.9654C9.50303 20.7751 9.67833 19.9822 10.0289 18.3962L10.7157 15.2896C10.9826 14.082 11.1161 13.4782 10.7951 13.0759C10.4741 12.6736 9.85877 12.6736 8.62814 12.6736Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <div className='p-3 text-gray-700'>
        <p>Before clicking on start reload the page. After filling the form data make sure to stop it. If you visit the site again to fill the form you will get the previous data you filled. <span className='text-red-500'>Make sure the button is on stop before copying pasting your data back.</span></p>

      </div>
      <div className='data-list p-3'>
        <div className='flex items-center justify-center'>
          <button
            onClick={handleRecord}
            className={`record-btn p-2 mb-4 ${isRecording ? 'bg-red-500 hover:bg-red-600 duration-200' : 'bg-green-500 hover:bg-green-600 duration-200'} text-white rounded-full`}
          >
            {isRecording ? 'Stop Saving' : 'Start Saving'}
          </button>
        </div>
        {formDataList.length > 0 ? (
          <ul>
            {formDataList.map(({ url, formData }, index) => (
              <li key={index} className='mb-4 bg-gray-200 rounded-lg p-2'>
                <div className='flex justify-between items-center'>
                  <a href={url} target='_blank' className='font-bold text-blue-500 hover:text-blue-700 cursor-pointer duration-200'>{url}</a>
                  <button
                    onClick={() => handleDelete(url)}
                    className='delete-btn ml-2 px-2 py-1 bg-red-500 text-white rounded-full hover:bg-red-700 duration-200'
                  >
                    Delete
                  </button>
                </div>
                <ul className='mt-2'>
                  {Object.keys(formData).map((key) => (
                    <li key={key} className='whitespace-normal break-words'>
                      <strong>{key}:</strong> {formData[key]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center'>No form data stored yet ! Fill Forms ;)</p>
        )}
      </div>
    </div>
  );
};

export default App;
