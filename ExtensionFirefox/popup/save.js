
// Get references to the input field and the submit button
const commentField = document.getElementById('text-input');
const titleField = document.getElementById('title-input');

const submitButton = document.getElementById('submit-button');

title = "";
comment = "";

// Add an event listener to the input field
commentField.addEventListener('input', (event) => {
  const userInput = event.target.value;
});

titleField.addEventListener('input', (event) => {
  const userInput = event.target.value;
});

// popup.js
document.addEventListener("DOMContentLoaded", () => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const currentTitle = tabs[0].title;
    titleField.value = currentTitle;
  });
});




// Add an event listener to the submit button
submitButton.addEventListener('click', () => {
  submit()
});

document.addEventListener('DOMContentLoaded', () => {
  
  // Flag to track if Shift+Enter was pressed
  let shiftEnterPressed = false;

  // Add keydown event listener to the whole document
  document.addEventListener('keydown', function(event) {
    // Check if the pressed key is "Enter" and "Shift" is also held down
    if (event.key === 'Enter' && event.shiftKey) {
      shiftEnterPressed = true;
      submitButton.classList.add('pressed'); // Add the "pressed" class
    }
  });

  // Add keyup event listener to the whole document
  document.addEventListener('keyup', function(event) {
    if (shiftEnterPressed && event.key === 'Enter') {
      shiftEnterPressed = false; // Reset the flag
      submitButton.classList.remove('pressed'); // Remove the "pressed" class
      submitButton.click(); // Simulate a click on the submit button
    }
  });

});


function submit(){

  title = titleField.value;
  comment = commentField.value;

  defaultFileName = title;
  if (defaultFileName === "") {
    defaultFileName = "myLink";
  }

  browser.runtime.sendMessage({action: "download", fileName: defaultFileName, 
  data: 
    { title: title, 
      comment: comment
    }
  });
}


async function getCurrentTabUrl() {
  const queryInfo = { active: true, currentWindow: true };
  const [tab] = await browser.tabs.query(queryInfo);
  return tab.url;
}



