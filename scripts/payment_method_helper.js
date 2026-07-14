// payment_method_helper.js
// Requires an explicit payment method, auto-fills payment reference, and highlights method section.

(function initPaymentMethodHelper() {
    const METHOD_ID = "payment_payment_method_id";
    const REF_ID = "payment_ref_num";
    const HIGHLIGHT_CLASS = "zenstension-payment-method-highlight";
    const STYLE_ID = "zenstension-payment-method-style";
    const PLACEHOLDER_TEXT = "Select payment type";
    const REQUIRED_MESSAGE =
        "Please select a payment type before taking payment.";
    const PLACEHOLDER_DATA_KEY = "zenstensionPlaceholder";
    const FORM_GUARD_DATA_KEY = "zenstensionPaymentMethodGuarded";

    function getMethodElement() {
        return document.getElementById(METHOD_ID);
    }

    function getReferenceElement() {
        return document.getElementById(REF_ID);
    }

    function normalize(value) {
        return (value || "").trim().toLowerCase();
    }

    function getSelectedMethodName(methodElement) {
        if (!methodElement) return "";

        if (methodElement.tagName === "SELECT") {
            const selectedOption =
                methodElement.options[methodElement.selectedIndex];
            const selectedText = selectedOption
                ? selectedOption.textContent
                : "";
            return normalize(selectedText || methodElement.value);
        }

        return normalize(methodElement.value);
    }

    function hasSelectedPaymentMethod(methodElement) {
        if (!methodElement) return false;

        return normalize(methodElement.value) !== "";
    }

    function findPlaceholderOption(methodElement) {
        return Array.from(methodElement.options).find(
            (option) =>
                option.dataset[PLACEHOLDER_DATA_KEY] === "true" ||
                option.value === "",
        );
    }

    function ensureBlankDefault(methodElement) {
        if (methodElement.tagName !== "SELECT") {
            methodElement.value = "";
            return;
        }

        let placeholderOption = findPlaceholderOption(methodElement);
        if (!placeholderOption) {
            placeholderOption = document.createElement("option");
            placeholderOption.value = "";
            methodElement.insertBefore(
                placeholderOption,
                methodElement.firstChild,
            );
        }

        placeholderOption.textContent = PLACEHOLDER_TEXT;
        placeholderOption.disabled = true;
        placeholderOption.dataset[PLACEHOLDER_DATA_KEY] = "true";
        placeholderOption.selected = true;
        methodElement.value = "";
    }

    function updateMethodValidity(methodElement) {
        if (!methodElement) return;

        methodElement.required = true;
        methodElement.setAttribute("aria-required", "true");
        methodElement.setCustomValidity(
            hasSelectedPaymentMethod(methodElement) ? "" : REQUIRED_MESSAGE,
        );
    }

    function methodToReference(methodName) {
        if (methodName === "cash") return "cash";
        if (methodName === "eftpos") return "pc";
        return null;
    }

    function setReferenceValue(referenceElement, value) {
        referenceElement.value = value;

        referenceElement.dispatchEvent(
            new Event("input", { bubbles: true, cancelable: true }),
        );
        referenceElement.dispatchEvent(
            new Event("change", { bubbles: true, cancelable: true }),
        );
    }

    function applyMethodRule() {
        const methodElement = getMethodElement();
        const referenceElement = getReferenceElement();

        if (!methodElement || !referenceElement) return;

        updateMethodValidity(methodElement);

        const methodName = getSelectedMethodName(methodElement);
        const mappedValue = methodToReference(methodName);

        setReferenceValue(referenceElement, mappedValue ?? "");
    }

    function ensureHighlightStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
            .${HIGHLIGHT_CLASS} {
                outline: 2px solid #d93025 !important;
                outline-offset: 2px;
                border-radius: 4px;
            }
        `;

        document.head.appendChild(style);
    }

    function findBestHighlightTarget(methodElement) {
        const formGroup = methodElement.closest(
            ".form-group, .control-group, .field, .input-group",
        );

        return formGroup || methodElement;
    }

    function preventPaymentIfMethodMissing(event, methodElement) {
        updateMethodValidity(methodElement);
        if (hasSelectedPaymentMethod(methodElement)) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        methodElement.focus();

        if (typeof methodElement.reportValidity === "function") {
            methodElement.reportValidity();
        }
    }

    function isSubmitControl(element) {
        if (!element) return false;

        const control = element.closest("button, input");
        if (!control) return false;
        const controlText = normalize(control.textContent || control.value);

        if (control.tagName === "BUTTON") {
            return (
                !control.type ||
                control.type.toLowerCase() === "submit" ||
                controlText === "take payment"
            );
        }

        return (
            ["submit", "image"].includes(control.type.toLowerCase()) ||
            controlText === "take payment"
        );
    }

    function guardPaymentForm(methodElement) {
        const form = methodElement.form || methodElement.closest("form");
        if (!form || form.dataset[FORM_GUARD_DATA_KEY] === "true") return;

        form.dataset[FORM_GUARD_DATA_KEY] = "true";

        form.addEventListener(
            "submit",
            (event) => preventPaymentIfMethodMissing(event, methodElement),
            true,
        );
        form.addEventListener(
            "click",
            (event) => {
                if (!isSubmitControl(event.target)) return;

                preventPaymentIfMethodMissing(event, methodElement);
            },
            true,
        );
    }

    function highlightMethodSection() {
        const methodElement = getMethodElement();
        if (!methodElement) return;

        ensureHighlightStyle();

        const target = findBestHighlightTarget(methodElement);
        target.classList.add(HIGHLIGHT_CLASS);
    }

    function initWhenReady() {
        const methodElement = getMethodElement();
        if (!methodElement) return false;

        ensureBlankDefault(methodElement);
        updateMethodValidity(methodElement);
        highlightMethodSection();
        guardPaymentForm(methodElement);
        applyMethodRule();

        methodElement.addEventListener("change", applyMethodRule);
        methodElement.addEventListener("input", applyMethodRule);

        return true;
    }

    if (!initWhenReady()) {
        const observer = new MutationObserver(() => {
            if (initWhenReady()) {
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }
})();
