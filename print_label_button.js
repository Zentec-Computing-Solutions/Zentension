// print_label_button.js
// Provides initPrintLabel() to add the Print Label button (ticket pages)

function initPrintLabel() {
    if (document.getElementById("print-label-button")) return;

    const button = document.createElement("button");
    button.id = "print-label-button";
    button.textContent = "Print Label";
    button.classList.add("btn", "btn-default", "btn-sm");
    button.style.backgroundColor = "#007a43";

    button.onclick = () => {
        const scriptElement = document.createElement("script");
        scriptElement.src = chrome.runtime.getURL("show_pdf.js");
        document.body.appendChild(scriptElement);
        scriptElement.onload = () => document.body.removeChild(scriptElement);
        return false;
    };

    const targetElement = document.querySelector(".title-btns");
    if (targetElement) {
        targetElement.prepend(button);
    } else {
        console.warn(
            "Zenstension: Target element with class '.title-btns' not found on this ticket page. Button will not be added."
        );
    }
}
