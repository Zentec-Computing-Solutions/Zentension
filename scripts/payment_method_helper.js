// payment_method_helper.js
// Auto-fills payment reference based on payment method and highlights method section.

(function initPaymentMethodHelper() {
    const METHOD_ID = "payment_payment_method_id";
    const REF_ID = "payment_ref_num";
    const HIGHLIGHT_CLASS = "zenstension-payment-method-highlight";
    const STYLE_ID = "zenstension-payment-method-style";

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

        highlightMethodSection();
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
