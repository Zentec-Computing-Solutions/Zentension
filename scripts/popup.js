const input = document.getElementById("priceInput");
const calculateBtn = document.getElementById("calculateBtn");
const copyBtn = document.getElementById("copyBtn");

function runCalculation() {
    const value = input.value;
    const price = calculatePrice(value);
    document.getElementById("calculatedPrice").value = price;
}

calculateBtn.addEventListener("click", runCalculation);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        runCalculation();
    }
});

copyBtn.addEventListener("click", () => {
    let price = document.getElementById("calculatedPrice").value;
    navigator.clipboard.writeText(price);
});
