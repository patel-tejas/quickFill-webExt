import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('red')

  const handleColor = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color

      }
    });
  }

  return (
    <>
      <div className='flex flex-col gap-2 items-center justify-center w-full'>
        <h1 className='text-center'>Background Colour Changer</h1>
        <div className='flex gap-2'>
          <input type="color" name="colour_picker" id="colour_picker" value={color} onChange={(e) => setColor(e.target.value)} className='' />
          <button className='p-3 bg-gray-700 text-white' onClick={handleColor}>Change</button>
        </div>
      </div>
    </>
  )
}

export default App
