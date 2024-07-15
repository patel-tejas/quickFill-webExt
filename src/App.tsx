import React, { useEffect, useState } from 'react';
import './index.css';

const App: React.FC = () => {
  const [storedData, setStoredData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // Check if chrome object and chrome.storage are available
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // Fetch stored data from chrome.storage.local
      chrome.storage.local.get(null, (data) => {
        setStoredData(data);
      });
    } else {
      console.warn('Chrome storage API is not available.');
    }
  }, []);

  return (
    <div className='w-[400px] p-4 bg-white text-black font-sans'>
      <h1 className='text-lg font-bold mb-4'>Stored Form Data</h1>
      <div className='data-list'>
        {Object.keys(storedData).length > 0 ? (
          <ul className='space-y-2'>
            {Object.keys(storedData).map((key) => (
              <li key={key} className='p-2 bg-gray-100 rounded-md'>
                <strong className='block text-blue-600'>{key}</strong>
                <pre className='bg-gray-200 p-2 rounded-md text-sm'>
                  {JSON.stringify(storedData[key], null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm'>No stored data.</p>
        )}
      </div>
    </div>
  );
};

export default App;
