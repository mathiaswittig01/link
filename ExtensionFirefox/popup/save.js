


// Get references to the input field and the submit button
const inputField = document.getElementById('text-input');
const submitButton = document.getElementById('submit-button');

// Add an event listener to the input field
inputField.addEventListener('input', (event) => {
  // Handle input changes, if needed
  const userInput = event.target.value;
  // Perform actions based on user input
  // ...
});

// Add an event listener to the submit button
submitButton.addEventListener('click', () => {
  // openFileExplorer();
  // save1();
  browser.runtime.sendMessage({action: "download", data: {name: "John", age: 30, city: "New York"}});
});


function save1(){
  // Create a sample JSON object
  const data = { name: "John", age: 30, city: "New York" };

  // Convert the JSON object to a JSON-formatted string
  const jsonString = JSON.stringify(data);

  // Create a Blob object representing the data as a JSON file
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an object URL for the Blob object
  // const url = URL.createObjectURL(blob);
  // const url = "https://www.mathias-wittig.com";
  
  const url = URL.createObjectURL(blob);
  console.log("URL: "+url);

  // Trigger the download
  browser.downloads.download({
    url: url,
    filename: 'sample.json',
    saveAs: true // Prompts save dialog box
  });

  // Release object URL to free up resources
  URL.revokeObjectURL(url);
}



// Function to open the file explorer dialog
function openFileExplorer() {
  // Options for the file explorer dialog
  const options = {
    type: 'save', // You can choose 'open' or 'save' depending on your use case
    suggestedName: 'file.txt', // Default file name
  };

  // Open the file explorer dialog
  const filePickerPromise = browser.filePicker.open(options);

  // Handle the result of the file picker dialog
  filePickerPromise.then((result) => {
    if (result) {
      // User selected a file
      const chosenFile = result[0];
      // Perform actions with the chosen file, such as saving it or processing it
      console.log('Selected file:', chosenFile);
    } else {
      // User canceled the file picker dialog
      console.log('File picker canceled');
    }
  }).catch((error) => {
    // Handle any errors that may occur during file picker usage
    console.error('File picker error:', error);
  });
}