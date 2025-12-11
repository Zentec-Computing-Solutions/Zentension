function calculatePrice(input) {
    if (input) {
        try {
            inputInt = parseFloat(input);
            let result = 0;
            if (inputInt === 0) {
                result = 0;
            } else if (inputInt < 10) {
                result = Math.round(inputInt * 2 * 100) / 100;
            } else if (inputInt > 9.99 && inputInt < 15) {
                result = Math.round(inputInt * 1.9 * 100) / 100;
            } else if (inputInt > 14.99 && inputInt < 20) {
                result = Math.round(inputInt * 1.8 * 100) / 100;
            } else if (inputInt > 19.99 && inputInt < 25) {
                result = Math.round(inputInt * 1.75 * 100) / 100;
            } else if (inputInt > 24.99 && inputInt < 30) {
                result = Math.round(inputInt * 1.7 * 100) / 100;
            } else if (inputInt > 29.99 && inputInt < 35) {
                result = Math.round(inputInt * 1.65 * 100) / 100;
            } else if (inputInt > 34.99 && inputInt < 40) {
                result = Math.round(inputInt * 1.6 * 100) / 100;
            } else if (inputInt > 39.99 && inputInt < 45) {
                result = Math.round(inputInt * 1.55 * 100) / 100;
            } else if (inputInt > 44.99 && inputInt < 60) {
                result = Math.round(inputInt * 1.5 * 100) / 100;
            } else if (inputInt > 59.99 && inputInt < 70) {
                result = Math.round(inputInt * 1.48 * 100) / 100;
            } else if (inputInt > 69.99 && inputInt < 80) {
                result = Math.round(inputInt * 1.47 * 100) / 100;
            } else if (inputInt > 79.99 && inputInt < 90) {
                result = Math.round(inputInt * 1.46 * 100) / 100;
            } else if (inputInt > 89.99 && inputInt < 100) {
                result = Math.round(inputInt * 1.45 * 100) / 100;
            } else if (inputInt > 99.99 && inputInt < 110) {
                result = Math.round(inputInt * 1.44 * 100) / 100;
            } else if (inputInt > 109.99 && inputInt < 120) {
                result = Math.round(inputInt * 1.43 * 100) / 100;
            } else if (inputInt > 119.99 && inputInt < 130) {
                result = Math.round(inputInt * 1.42 * 100) / 100;
            } else if (inputInt > 129.99 && inputInt < 140) {
                result = Math.round(inputInt * 1.41 * 100) / 100;
            } else if (inputInt > 139.99 && inputInt < 150) {
                result = Math.round(inputInt * 1.4 * 100) / 100;
            } else if (inputInt > 149.99 && inputInt < 160) {
                result = Math.round(inputInt * 1.39 * 100) / 100;
            } else if (inputInt > 159.99 && inputInt < 170) {
                result = Math.round(inputInt * 1.38 * 100) / 100;
            } else if (inputInt > 169.99 && inputInt < 180) {
                result = Math.round(inputInt * 1.37 * 100) / 100;
            } else if (inputInt > 179.99 && inputInt < 190) {
                result = Math.round(inputInt * 1.36 * 100) / 100;
            } else if (inputInt > 189.99 && inputInt < 200) {
                result = Math.round(inputInt * 1.35 * 100) / 100;
            } else if (inputInt > 199.99 && inputInt < 225) {
                result = Math.round(inputInt * 1.345 * 100) / 100;
            } else if (inputInt > 224.99 && inputInt < 250) {
                result = Math.round(inputInt * 1.34 * 100) / 100;
            } else if (inputInt > 249.99 && inputInt < 300) {
                result = Math.round(inputInt * 1.335 * 100) / 100;
            } else if (inputInt > 299.99 && inputInt < 375) {
                result = Math.round(inputInt * 1.33 * 100) / 100;
            } else if (inputInt > 374.99 && inputInt < 475) {
                result = Math.round(inputInt * 1.325 * 100) / 100;
            } else if (inputInt > 474.99 && inputInt < 550) {
                result = Math.round(inputInt * 1.32 * 100) / 100;
            } else if (inputInt > 549.99 && inputInt < 650) {
                result = Math.round(inputInt * 1.315 * 100) / 100;
            } else if (inputInt > 649.99 && inputInt < 750) {
                result = Math.round(inputInt * 1.31 * 100) / 100;
            } else if (inputInt > 749.99 && inputInt < 850) {
                result = Math.round(inputInt * 1.305 * 100) / 100;
            } else if (inputInt > 849.99 && inputInt < 1000) {
                result = Math.round(inputInt * 1.3 * 100) / 100;
            } else if (inputInt > 999.99 && inputInt < 1100) {
                result = Math.round(inputInt * 1.295 * 100) / 100;
            } else if (inputInt > 1099.99 && inputInt < 1200) {
                result = Math.round(inputInt * 1.29 * 100) / 100;
            } else if (inputInt > 1199.99 && inputInt < 1300) {
                result = Math.round(inputInt * 1.285 * 100) / 100;
            } else if (inputInt > 1299.99 && inputInt < 1400) {
                result = Math.round(inputInt * 1.28 * 100) / 100;
            } else if (inputInt > 1399.99 && inputInt < 1500) {
                result = Math.round(inputInt * 1.275 * 100) / 100;
            } else if (inputInt > 1499.99 && inputInt < 1600) {
                result = Math.round(inputInt * 1.27 * 100) / 100;
            } else if (inputInt > 1599.99 && inputInt < 1700) {
                result = Math.round(inputInt * 1.265 * 100) / 100;
            } else if (inputInt > 1699.99 && inputInt < 1800) {
                result = Math.round(inputInt * 1.26 * 100) / 100;
            } else if (inputInt > 1799.99 && inputInt < 1900) {
                result = Math.round(inputInt * 1.225 * 100) / 100;
            } else if (inputInt > 1899.99 && inputInt < 2000) {
                result = Math.round(inputInt * 1.25 * 100) / 100;
            } else if (inputInt > 1999.99) {
                result = Math.round(inputInt * 1.2 * 100) / 100;
            }
            return result;
        } catch (error) {
            console.error("Error calculating price: ", error);
        }
    }
}

window.calculatePrice = calculatePrice;
