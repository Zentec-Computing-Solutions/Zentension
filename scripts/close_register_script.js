function fillRegisterCloseFields() {
    const fieldValues = {
        register_close_ventis: "10",
        register_close_chincos: "10",
        register_close_dollars: "10",
        register_close_two: "10",
        register_close_five: "5",
        register_close_ten: "4",
        register_close_twenty: "4",
        register_close_fifty: "2",
    };

    for (const id in fieldValues) {
        const field = document.getElementById(id);
        if (field) {
            field.value = fieldValues[id];

            // Dispatch an 'input' event
            const inputEvent = new Event("input", {
                bubbles: true,
                cancelable: true,
            });
            field.dispatchEvent(inputEvent);

            // Dispatch a 'change' event
            const changeEvent = new Event("change", {
                bubbles: true,
                cancelable: true,
            });
            field.dispatchEvent(changeEvent);
        } else {
            console.warn(
                `Zenstension: Field with ID '${id}' not found on register close page.`
            );
        }
    }
}

if (!document.getElementById("fill-defaults-button")) {
    const button = document.createElement("button");
    button.id = "fill-defaults-button";
    button.textContent = "Fill Default Till Amounts";
    button.classList.add("btn", "btn-default", "btn-sm");
    button.style.marginRight = "10px";
    // You can style the button further here if needed, e.g.:
    // button.classList.add("btn", "btn-primary", "btn-sm");
    // button.style.margin = "5px";

    button.onclick = fillRegisterCloseFields;

    // Attempt to find the target form with ID 'register-form'.
    const targetForm = document.getElementById("register-form");

    if (targetForm && targetForm.parentNode) {
        // Insert the button after the target form.
        targetForm.parentNode.insertBefore(button, targetForm.nextSibling);
    } else {
        // Fallback or warning if the form isn't found
        console.warn(
            "Zenstension: Form with ID 'register-form' not found. Button will be prepended to the first form or body as a fallback."
        );
        // Fallback to prepending to the first form or body if the specific form isn't found
        const fallbackTarget = document.querySelector("form") || document.body;
        fallbackTarget.prepend(button);
    }
}
