const input = document.getElementById("priceInput");
const calculateBtn = document.getElementById("calculateBtn");
const outputCopyBtn = document.getElementById("outputCopyBtn");
const gstInclusiveCopyBtn = document.getElementById("gstInclusiveCopyBtn");
const gstSwitch = document.getElementById("gstSwitch");
const gstInclusiveInput = document.getElementById("gstInclusiveInput");

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

gstSwitch.addEventListener("click", () => {
    if (!gstSwitch.checked) {
        gstInclusiveInput.disabled = true;
        gstInclusiveCopyBtn.disabled = true;
    } else {
        gstInclusiveInput.disabled = false;
        gstInclusiveCopyBtn.disabled = false;
    }
});
