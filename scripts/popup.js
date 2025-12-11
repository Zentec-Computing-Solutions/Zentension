const input = document.getElementById("priceInput");
const btn = document.getElementById("calculateBtn");

function runCalculation() {
    const value = input.value;
    const price = calculatePrice(value);
    document.getElementById("calculatedPrice").textContent = price;
}

btn.addEventListener("click", runCalculation);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        runCalculation();
    }
});
