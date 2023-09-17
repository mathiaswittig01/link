// Get references to the input fields and the submit button
const commentField = document.getElementById('text-input');
const titleField = document.getElementById('title-input');
const submitButton = document.getElementById('submit-button');

// Initialize variables
let title = "";
let comment = "";

// Add event listeners to the input fields
commentField.addEventListener('input', (event) => {
  const userInput = event.target.value;
  // Process userInput if necessary
});

titleField.addEventListener('input', (event) => {
  const userInput = event.target.value;
  // Process userInput if necessary
});

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTitle = tabs[0].title;
    titleField.value = currentTitle;
  });
});

// Add an event listener to the submit button
submitButton.addEventListener('click', () => {
  submit();
});

// Key event handling
document.addEventListener('DOMContentLoaded', () => {
  let shiftEnterPressed = false;

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.shiftKey) {
      shiftEnterPressed = true;
      submitButton.classList.add('pressed');
    }
  });

  document.addEventListener('keyup', function(event) {
    if (shiftEnterPressed && event.key === 'Enter') {
      shiftEnterPressed = false;
      submitButton.classList.remove('pressed');
      submitButton.click();
    }
  });
});

function submit() {
  title = titleField.value;
  comment = commentField.value;

  let defaultFileName = title;
  if (defaultFileName === "") {
    defaultFileName = "myLink";
  }

  chrome.runtime.sendMessage({
    action: "download", 
    fileName: defaultFileName, 
    data: {
      title: title,
      comment: comment
    }
  });
}

// The following function is not being used in the current code
// If you plan to use it, it will need to be modified for Chrome's callback-based API
/*
async function getCurrentTabUrl() {
  const queryInfo = { active: true, currentWindow: true };
  const [tab] = await browser.tabs.query(queryInfo);
  return tab.url;
}
*/
