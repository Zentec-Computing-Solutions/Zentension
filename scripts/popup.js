const input = document.getElementById("priceInput");
const calculateBtn = document.getElementById("calculateBtn");
const outputCopyBtn = document.getElementById("outputCopyBtn");
const gstInclusiveCopyBtn = document.getElementById("gstInclusiveCopyBtn");
const gstSwitch = document.getElementById("gstSwitch");
const gstInclusiveInput = document.getElementById("gstInclusiveInput");
const GST_SWITCH_STORAGE_KEY = "zenstension.gstIncluded";

function updateGstDependentUI() {
    const includesGst = gstSwitch.checked;

    // Only enable this field/copy button when the input excludes GST.
    gstInclusiveInput.disabled = includesGst;
    gstInclusiveCopyBtn.disabled = includesGst;
}

function restoreGstSwitchState() {
    const savedValue = localStorage.getItem(GST_SWITCH_STORAGE_KEY);
    if (savedValue !== null) {
        gstSwitch.checked = savedValue === "true";
    }

    updateGstDependentUI();
}

function persistGstSwitchState() {
    localStorage.setItem(GST_SWITCH_STORAGE_KEY, String(gstSwitch.checked));
}

function runCalculation() {
    const value = input.value;
    if (!gstSwitch.checked) {
        const gstInclusiveValue = value * 1.15;
        gstInclusiveInput.value = gstInclusiveValue.toFixed(2);
        const price = calculatePrice(gstInclusiveValue);
        document.getElementById("calculatedPrice").value = price;
    } else {
        const price = calculatePrice(value);
        document.getElementById("calculatedPrice").value = price;
    }
}

restoreGstSwitchState();

calculateBtn.addEventListener("click", runCalculation);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        runCalculation();
    }
});

outputCopyBtn.addEventListener("click", () => {
    let price = document.getElementById("calculatedPrice").value;
    navigator.clipboard.writeText(price);
});

gstInclusiveCopyBtn.addEventListener("click", () => {
    let gstInclusivePrice = gstInclusiveInput.value;
    navigator.clipboard.writeText(gstInclusivePrice);
});

gstSwitch.addEventListener("change", () => {
    persistGstSwitchState();
    updateGstDependentUI();
});
