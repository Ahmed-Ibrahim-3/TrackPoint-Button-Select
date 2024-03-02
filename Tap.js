document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the container and selected button elements
    var selectedButton = document.getElementById('selectedButton');

    // Get references to the buttons and clear button
    var buttons = document.querySelectorAll('.hover-button');
    var clearButton = document.getElementById('clear');

    // Set up touch event listeners for each button
    buttons.forEach(function (button) {
        button.addEventListener('touchstart', function (event) {
            // Prevent default touch behavior
            event.preventDefault();
            // Display the selected button text
            selectedButton.textContent += button.textContent +", ";
        });
    });

    // Set up touch event listener for the clear button
    clearButton.addEventListener('touchstart', function (event) {
        // Prevent default touch behavior
        event.preventDefault();

        // Clear the selected button text
        selectedButton.textContent = '';
    });
});