# QuickFill

QuickFill is a Chrome extension designed to save and automatically fill form data for large forms, such as hackathon forms, signup forms, and Google forms. Never lose your progress again!

## Features

- **Auto Save:** Automatically saves form data as you type.
- **Auto Fill:** Automatically fills in saved form data when you revisit the form.
- **Manage Saved Data:** View and manage your saved form data directly from the extension popup.
- **Delete Data:** Easily delete saved form data when it is no longer needed.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/quickfill.git

2. Navigate to the project directory:
   ```sh
   cd quickfill

3. Install the dependencies::
   ```sh
   npm install

4. Build the project:
   ```sh
   npm run build

5. Load the extension in Chrome:
  - Open Chrome and navigate to chrome://extensions/
  - Enable "Developer mode" in the top right corner
  - Click on "Load unpacked" and select the build folder inside your project directory 

**Usage**
- Click on the QuickFill icon in the Chrome toolbar to open the popup.
- The popup will display the stored form data for the current URL.
- You can delete stored data by clicking the "Delete" button next to the corresponding URL.
- When you revisit a form, QuickFill will automatically fill in the saved data.