function generateText() {
  // Get the user's input and choices
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const hotel = document.getElementById("hotel").value;

  // Create an array to store the selected checkboxes
  const selectedCheckboxes = [];

  // Get all the checkbox elements
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  // Add the text from the selected checkboxes to the array
  checkboxes.forEach((checkbox) => {
    selectedCheckboxes.push(checkbox.value);
  });

  // Join the selected checkboxes into a comma-separated list
  const checkboxesText = selectedCheckboxes.join(', ');

  // Replace the placeholders in the text template with the user's input, choices, and the comma-separated list of selected checkboxes
  const generatedText = textTemplate
    .replace("[NAME]", name)
    .replace("[CITY]", city)
    .replace("[HOTEL]", hotel)
    .replace("[CHECKBOXES]", checkboxesText); // Add a placeholder for the checkboxes

  // Update the HTML element with the generated text
  document.getElementById("output").textContent = generatedText;

  // Set the clipboard text to the generated text
  const clipboardText = document.getElementById("clipboard-text");
  clipboardText.value = generatedText;
}