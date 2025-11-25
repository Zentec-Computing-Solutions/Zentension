const button = document.createElement("button");
button.textContent = "Print Label";
button.classList.add("btn", "btn-default", "btn-sm");
button.style.backgroundColor = "#007a43";

button.onclick = () => {
    const scriptElement = document.createElement("script");
    scriptElement.src = chrome.runtime.getURL("page_script.js");
    // Append to body, execute, and then remove
    document.body.appendChild(scriptElement);
    scriptElement.onload = () => {
        document.body.removeChild(scriptElement);
    };
    return false; // Prevent default button action
};

// Check if the current page is a specific ticket page
const currentPath = window.location.pathname;
// Regex to match /tickets/ followed by one or more digits, and then the end of the path.
// e.g., /tickets/12345 will match, but /tickets/ or /tickets/new will not.
const ticketSpecificPageRegex = /^\/tickets\/\d+$/;

if (ticketSpecificPageRegex.test(currentPath)) {
    // It's good practice to ensure the script doesn't run multiple times
    // if the content script is injected multiple times for some reason.
    if (!document.getElementById("print-label-button")) {
        button.id = "print-label-button";

        // Attempt to find the target element to prepend the button to.
        const targetElement = document.querySelector(".title-btns");

        // Prepend the button to the target element if found
        if (targetElement) {
            targetElement.prepend(button);
        } else {
            // Log a warning if the target element isn't found on a page where it's expected
            console.warn(
                "Zenstension: Target element with class '.title-btns' not found on this ticket page. Button will not be added."
            );
        }
    }
}
