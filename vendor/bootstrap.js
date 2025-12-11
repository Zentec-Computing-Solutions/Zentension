// Bootstrap for Zenstension copy + print features.
// `copy_buttons.js` and `print_label_button.js` are injected before
// this file (see manifest.json). They expose `addCopyButtons()` and
// `initPrintLabel()` respectively.

const currentPath = window.location.pathname;
const ticketSpecificPageRegex = /^\/tickets\/\d+$/;
const customerPageRegex = /^\/customers\/\d+$/;

if (ticketSpecificPageRegex.test(currentPath)) {
    try {
        if (typeof initPrintLabel === "function") initPrintLabel();
    } catch (err) {
        console.warn("Zenstension: initPrintLabel error", err);
    }

    try {
        if (typeof addCopyButtons === "function") addCopyButtons(["customer"]);
    } catch (err) {
        console.warn("Zenstension: addCopyButtons error", err);
    }
}

if (customerPageRegex.test(currentPath)) {
    try {
        if (typeof addCopyButtons === "function") addCopyButtons(["email"]);
    } catch (err) {
        console.warn("Zenstension: addCopyButtons error", err);
    }
}
