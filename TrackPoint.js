window.onload = function ()
{
    var joystick = document.getElementById("joystick");
    var cursor = document.getElementById("cursor");
    var container = document.getElementById("container");
    var selectedButtonElement = document.getElementById("selectedButton");
    var joystickCenter = {
        x: joystick.offsetLeft + joystick.offsetWidth / 2,
        y: joystick.offsetTop + joystick.offsetHeight / 2,
    };
    var sensitivity = 0.025; // cursor sensitivity
    var buttons = document.getElementsByClassName("hover-button");
    var hoverTimeouts = Array(buttons.length);
    var hoverIntervals = Array(buttons.length);
    joystick.addEventListener(
        "touchmove",
        function (e)
        {
            e.preventDefault();
            var touch = e.touches[0];
            // find new cursor position
            var dx = (touch.clientX - joystickCenter.x) * sensitivity;
            var dy = (touch.clientY - joystickCenter.y) * sensitivity;
            var newLeft = cursor.offsetLeft + dx;
            var newTop = cursor.offsetTop + dy;

            // Check new cursor position is within container
            if (
                newLeft >= 0 &&
                newLeft <= container.offsetWidth - cursor.offsetWidth &&
                newTop >= 0 &&
                newTop <= container.offsetHeight - cursor.offsetHeight
            )
            {
                // move cursor
                cursor.style.left = newLeft + "px";
                cursor.style.top = newTop + "px";
            }

            // Check if cursor is overlaps with any buttons
            for (var i = 0; i < buttons.length; i++)
            {
                (function (i)
                {
                    var button = buttons[i];
                    var buttonRect = button.getBoundingClientRect();
                    var cursorRect = cursor.getBoundingClientRect();
                    if (
                        cursorRect.left < buttonRect.right &&
                        cursorRect.right > buttonRect.left &&
                        cursorRect.top < buttonRect.bottom &&
                        cursorRect.bottom > buttonRect.top
                    )
                    {
                        button.style.backgroundColor = "blue";
                        button.style.color = "white";
                        cursor.style.backgroundColor = "yellow";

                        clearTimeout(hoverTimeouts[i]);
                        clearInterval(hoverIntervals[i]);

                        // increase cursor size over time
                        hoverIntervals[i] = setInterval(function ()
                        {
                            cursor.style.width = parseInt(cursor.style.width) + 1 + "px";
                            cursor.style.height = parseInt(cursor.style.height) + 1 + "px";
                        }, 50);

                        cursor.style.width = "10px";
                        cursor.style.height = "10px";

                        // select button after 1000ms
                        hoverTimeouts[i] = setTimeout(function ()
                        {
                            if(button.id === "clear")
                            {
                                selectedButtonElement.textContent = "";
                                button.style.backgroundColor = "red";

                            } else{
                                button.style.backgroundColor = "green";
                                selectedButtonElement.textContent +=
                                    button.textContent + ", ";
                            }
                            cursor.style.width = "10px";
                            cursor.style.height = "10px";
                            clearTimeout(hoverTimeouts[i]);
                            clearInterval(hoverIntervals[i]);

                        }, 1000);
                    }
                    else
                    {
                        // reset to default button, cursor, and timeouts
                        button.style.backgroundColor = "";
                        button.style.color = "";
                        cursor.style.backgroundColor = "";
                        clearTimeout(hoverTimeouts[i]);
                        clearInterval(hoverIntervals[i]);
                    }
                })(i);
            }
        },
        false
    );
};
