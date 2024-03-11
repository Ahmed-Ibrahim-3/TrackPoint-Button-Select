document.addEventListener('DOMContentLoaded', function () {
    var selectedButton = document.getElementById('selectedButton');
    var buttons = document.querySelectorAll('.hover-button');
    var clearButton = document.getElementById('clear');

    buttons.forEach(function (button) {
        button.addEventListener('touchstart', function (event) {
            event.preventDefault();
            selectedButton.textContent += button.textContent +", ";
        });
    });

    clearButton.addEventListener('touchstart', function (event) {
        event.preventDefault();

        selectedButton.textContent = '';
    });
});