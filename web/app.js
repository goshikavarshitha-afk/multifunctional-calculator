/* =========================================
   MULTI-FUNCTIONAL CALCULATOR
   ========================================= */


/* =========================================
   GLOBAL HISTORY
   ========================================= */

let history = [];


/* =========================================
   NAVIGATION
   ========================================= */

const navButtons =
    document.querySelectorAll(".nav-btn");


const sections =
    document.querySelectorAll(".section");


navButtons.forEach(button => {

    button.addEventListener("click", () => {


        const target =
            button.dataset.section;


        navButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const targetSection =
            document.getElementById(target);


        if (targetSection) {

            targetSection.classList.add(
                "active-section"
            );

        }

    });

});


/* =========================================
   BASIC CALCULATOR
   ========================================= */

let selectedBasicOperation = "+";


const basicOperationButtons =
    document.querySelectorAll(
        ".basic-operation"
    );


basicOperationButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            basicOperationButtons.forEach(
                btn => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            selectedBasicOperation =
                button.dataset.operation;

        }
    );

});



document
    .getElementById("basicCalculate")
    .addEventListener(
        "click",
        calculateBasic
    );



function calculateBasic() {


    const num1 =
        document.getElementById(
            "basicNum1"
        ).value;


    const num2 =
        document.getElementById(
            "basicNum2"
        ).value;


    const resultElement =
        document.getElementById(
            "basicResult"
        );


    const messageElement =
        document.getElementById(
            "basicMessage"
        );


    if (
        num1 === "" ||
        num2 === ""
    ) {


        resultElement.textContent =
            "—";


        messageElement.textContent =
            "Enter numbers and click Calculate";


        return;

    }


    const a = Number(num1);

    const b = Number(num2);


    let result;


    switch (selectedBasicOperation) {


        case "+":

            result = a + b;

            break;


        case "-":

            result = a - b;

            break;


        case "*":

            result = a * b;

            break;


        case "/":

            if (b === 0) {

                resultElement.textContent =
                    "Error";

                messageElement.textContent =
                    "Cannot divide by zero";

                return;

            }

            result = a / b;

            break;


        case "%":

            if (b === 0) {

                resultElement.textContent =
                    "Error";

                messageElement.textContent =
                    "Cannot divide by zero";

                return;

            }

            result = a % b;

            break;


    }


    const formatted =
        formatNumber(result);


    const symbol =
        getOperationSymbol(
            selectedBasicOperation
        );


    resultElement.textContent =
        formatted;


    messageElement.textContent =
        `${a} ${symbol} ${b} = ${formatted}`;


    addHistory(
        `${a} ${symbol} ${b}`,
        formatted
    );

}



/* BASIC CLEAR */

document
    .getElementById("basicClear")
    .addEventListener(
        "click",
        clearBasic
    );


function clearBasic() {


    document.getElementById(
        "basicNum1"
    ).value = "";


    document.getElementById(
        "basicNum2"
    ).value = "";


    selectedBasicOperation = "+";


    basicOperationButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    document
        .querySelector(
            '.basic-operation[data-operation="+"]'
        )
        .classList.add("active");


    document.getElementById(
        "basicResult"
    ).textContent = "—";


    document.getElementById(
        "basicMessage"
    ).textContent =
        "Enter numbers and click Calculate";

}



/* OPERATION SYMBOL */

function getOperationSymbol(operation) {


    switch (operation) {


        case "+":

            return "+";


        case "-":

            return "−";


        case "*":

            return "×";


        case "/":

            return "÷";


        case "%":

            return "%";


        default:

            return operation;

    }

}


/* =========================================
   ADVANCED CALCULATOR
   ========================================= */

const advancedOperation =
    document.getElementById(
        "advancedOperation"
    );


const advancedSecondGroup =
    document.getElementById(
        "advancedSecondGroup"
    );


const advancedSecondLabel =
    document.getElementById(
        "advancedSecondLabel"
    );


advancedOperation.addEventListener(
    "change",
    updateAdvancedInputs
);


function updateAdvancedInputs() {


    const operation =
        advancedOperation.value;


    if (
        operation === "power" ||
        operation === "percentage"
    ) {


        advancedSecondGroup
            .classList
            .remove("hidden");


        if (operation === "power") {

            advancedSecondLabel.textContent =
                "Power (y)";

        }


        if (operation === "percentage") {

            advancedSecondLabel.textContent =
                "Percentage (%)";

        }

    } else {


        advancedSecondGroup
            .classList
            .add("hidden");

    }

}


document
    .getElementById("advancedCalculate")
    .addEventListener(
        "click",
        calculateAdvanced
    );


function calculateAdvanced() {


    const operation =
        advancedOperation.value;


    const xValue =
        document.getElementById(
            "advancedNumber"
        ).value;


    const secondValue =
        document.getElementById(
            "advancedSecondNumber"
        ).value;


    const resultElement =
        document.getElementById(
            "advancedResult"
        );


    const messageElement =
        document.getElementById(
            "advancedMessage"
        );


    if (xValue === "") {


        resultElement.textContent =
            "—";


        messageElement.textContent =
            "Enter a number";


        return;

    }


    const x = Number(xValue);


    let result;

    let description;


    switch (operation) {


        case "square":

            result = x ** 2;

            description =
                `${x}²`;

            break;


        case "cube":

            result = x ** 3;

            description =
                `${x}³`;

            break;


        case "sqrt":

            if (x < 0) {

                showAdvancedError(
                    "Square root requires a non-negative number."
                );

                return;

            }


            result =
                Math.sqrt(x);


            description =
                `√${x}`;

            break;


        case "power":


            if (secondValue === "") {

                showAdvancedError(
                    "Enter the power value."
                );

                return;

            }


            const y =
                Number(secondValue);


            result =
                Math.pow(x, y);


            description =
                `${x}^${y}`;

            break;


        case "percentage":


            if (secondValue === "") {

                showAdvancedError(
                    "Enter percentage value."
                );

                return;

            }


            const percentage =
                Number(secondValue);


            result =
                (x * percentage) / 100;


            description =
                `${percentage}% of ${x}`;

            break;


        case "sin":


            result =
                Math.sin(
                    x * Math.PI / 180
                );


            description =
                `sin(${x}°)`;

            break;


        case "cos":


            result =
                Math.cos(
                    x * Math.PI / 180
                );


            description =
                `cos(${x}°)`;

            break;


        case "tan":


            result =
                Math.tan(
                    x * Math.PI / 180
                );


            description =
                `tan(${x}°)`;

            break;


        case "log":


            if (x <= 0) {

                showAdvancedError(
                    "Logarithm requires a positive number."
                );

                return;

            }


            result =
                Math.log10(x);


            description =
                `log(${x})`;

            break;


        case "abs":


            result =
                Math.abs(x);


            description =
                `|${x}|`;

            break;


    }


    const formatted =
        formatNumber(result);


    resultElement.textContent =
        formatted;


    messageElement.textContent =
        `${description} = ${formatted}`;


    addHistory(
        description,
        formatted
    );

}



function showAdvancedError(message) {


    document.getElementById(
        "advancedResult"
    ).textContent =
        "Error";


    document.getElementById(
        "advancedMessage"
    ).textContent =
        message;

}



/* ADVANCED CLEAR */

document
    .getElementById("advancedClear")
    .addEventListener(
        "click",
        clearAdvanced
    );


function clearAdvanced() {


    document.getElementById(
        "advancedNumber"
    ).value = "";


    document.getElementById(
        "advancedSecondNumber"
    ).value = "";


    document.getElementById(
        "advancedOperation"
    ).value = "square";


    document.getElementById(
        "advancedResult"
    ).textContent = "—";


    document.getElementById(
        "advancedMessage"
    ).textContent =
        "Select operation and click Calculate";


    updateAdvancedInputs();

}


/* =========================================
   NUMBER UTILITIES
   ========================================= */

document
    .getElementById("utilityCalculate")
    .addEventListener(
        "click",
        calculateUtilities
    );


function calculateUtilities() {


    const input =
        document.getElementById(
            "utilityNumber"
        );


    const resultContainer =
        document.getElementById(
            "utilityResults"
        );


    if (input.value === "") {


        resultContainer.innerHTML =
            "Please enter a number.";


        return;

    }


    const number =
        Number(input.value);


    if (!Number.isInteger(number)) {


        resultContainer.innerHTML =
            "Please enter an integer.";


        return;

    }


    const selected =
        document.querySelectorAll(
            ".utility-check:checked"
        );


    if (selected.length === 0) {


        resultContainer.innerHTML =
            "Select at least one operation.";


        return;

    }


    let html = "";


    selected.forEach(check => {


        switch (check.value) {


            case "evenOdd":


                html += `

                    <div class="utility-result">

                        <strong>
                            Even / Odd:
                        </strong>

                        ${
                            number % 2 === 0
                            ? "Even"
                            : "Odd"
                        }

                    </div>

                `;


                break;



            case "prime":


                html += `

                    <div class="utility-result">

                        <strong>
                            Prime:
                        </strong>

                        ${
                            isPrime(number)
                            ? "Prime Number"
                            : "Not a Prime Number"
                        }

                    </div>

                `;


                break;



            case "palindrome":


                html += `

                    <div class="utility-result">

                        <strong>
                            Palindrome:
                        </strong>

                        ${
                            isPalindrome(number)
                            ? "Palindrome"
                            : "Not Palindrome"
                        }

                    </div>

                `;


                break;



            case "positive":


                let sign;


                if (number > 0) {

                    sign = "Positive";

                }

                else if (number < 0) {

                    sign = "Negative";

                }

                else {

                    sign = "Zero";

                }


                html += `

                    <div class="utility-result">

                        <strong>
                            Sign:
                        </strong>

                        ${sign}

                    </div>

                `;


                break;



            case "factorial":


                let factorialResult;


                if (number < 0) {

                    factorialResult =
                        "Not defined for negative numbers.";

                }

                else if (number > 170) {

                    factorialResult =
                        "Number too large.";

                }

                else {

                    factorialResult =
                        factorial(number);

                }


                html += `

                    <div class="utility-result">

                        <strong>
                            Factorial:
                        </strong>

                        ${factorialResult}

                    </div>

                `;


                break;



            case "reverse":


                html += `

                    <div class="utility-result">

                        <strong>
                            Reverse:
                        </strong>

                        ${reverseNumber(number)}

                    </div>

                `;


                break;


        }

    });


    resultContainer.innerHTML =
        html;


    addHistory(
        `Number utilities: ${number}`,
        "Completed"
    );

}



/* PRIME */

function isPrime(number) {


    if (number < 2) {

        return false;

    }


    if (number === 2) {

        return true;

    }


    if (number % 2 === 0) {

        return false;

    }


    for (
        let i = 3;
        i * i <= number;
        i += 2
    ) {


        if (number % i === 0) {

            return false;

        }

    }


    return true;

}



/* PALINDROME */

function isPalindrome(number) {


    const value =
        Math.abs(number)
            .toString();


    return (
        value ===
        value
            .split("")
            .reverse()
            .join("")
    );

}



/* FACTORIAL */

function factorial(number) {


    let result = 1;


    for (
        let i = 2;
        i <= number;
        i++
    ) {

        result *= i;

    }


    return result;

}



/* REVERSE */

function reverseNumber(number) {


    const sign =
        number < 0 ? "-" : "";


    const value =
        Math.abs(number)
            .toString()
            .split("")
            .reverse()
            .join("");


    return sign + value;

}


/* =========================================
   UNIT CONVERTER
   ========================================= */

document
    .getElementById("convertButton")
    .addEventListener(
        "click",
        convertUnit
    );


function convertUnit() {


    const type =
        document.getElementById(
            "conversionType"
        ).value;


    const valueInput =
        document.getElementById(
            "conversionValue"
        );


    const resultElement =
        document.getElementById(
            "conversionResult"
        );


    if (valueInput.value === "") {


        resultElement.textContent =
            "Enter a value";


        return;

    }


    const value =
        Number(valueInput.value);


    let result;

    let unit;


    switch (type) {


        case "fToC":

            result =
                (value - 32) * 5 / 9;

            unit = "°C";

            break;


        case "cToF":

            result =
                (value * 9 / 5) + 32;

            unit = "°F";

            break;


        case "kmToMiles":

            result =
                value * 0.621371;

            unit = "miles";

            break;


        case "milesToKm":

            result =
                value * 1.609344;

            unit = "km";

            break;


        case "kgToLb":

            result =
                value * 2.2046226218;

            unit = "lb";

            break;


        case "lbToKg":

            result =
                value * 0.45359237;

            unit = "kg";

            break;


        case "mToFt":

            result =
                value * 3.280839895;

            unit = "ft";

            break;


        case "ftToM":

            result =
                value * 0.3048;

            unit = "m";

            break;


    }


    const formatted =
        `${formatNumber(result)} ${unit}`;


    resultElement.textContent =
        formatted;


    addHistory(
        `${value} ${getConversionName(type)}`,
        formatted
    );

}



function getConversionName(type) {


    const names = {


        fToC:
            "Fahrenheit → Celsius",


        cToF:
            "Celsius → Fahrenheit",


        kmToMiles:
            "Kilometers → Miles",


        milesToKm:
            "Miles → Kilometers",


        kgToLb:
            "Kilograms → Pounds",


        lbToKg:
            "Pounds → Kilograms",


        mToFt:
            "Meters → Feet",


        ftToM:
            "Feet → Meters"


    };


    return names[type] || type;

}


/* =========================================
   AGE CALCULATOR
   ========================================= */

document
    .getElementById("ageCalculate")
    .addEventListener(
        "click",
        calculateAge
    );


function calculateAge() {


    const input =
        document.getElementById(
            "birthDate"
        );


    if (!input.value) {


        document.getElementById(
            "ageMessage"
        ).textContent =
            "Please enter your date of birth.";


        return;

    }


    const birth =
        parseDate(input.value);


    const today =
        new Date();


    if (birth > today) {


        document.getElementById(
            "ageMessage"
        ).textContent =
            "Date of birth cannot be in the future.";


        return;

    }


    let years =
        today.getFullYear() -
        birth.getFullYear();


    let months =
        today.getMonth() -
        birth.getMonth();


    let days =
        today.getDate() -
        birth.getDate();


    if (days < 0) {


        months--;


        const previousMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );


        days +=
            previousMonth.getDate();

    }


    if (months < 0) {


        years--;


        months += 12;

    }


    document.getElementById(
        "ageYears"
    ).textContent =
        years;


    document.getElementById(
        "ageMonths"
    ).textContent =
        months;


    document.getElementById(
        "ageDays"
    ).textContent =
        days;


    document.getElementById(
        "ageMessage"
    ).textContent =
        `You are ${years} years, ${months} months and ${days} days old.`;


    addHistory(
        `Age calculation: ${input.value}`,
        `${years} years ${months} months ${days} days`
    );

}



function parseDate(value) {


    const parts =
        value
            .split("-")
            .map(Number);


    return new Date(
        parts[0],
        parts[1] - 1,
        parts[2]
    );

}


/* =========================================
   HISTORY
   ========================================= */

function addHistory(
    operation,
    result
) {


    history.unshift({

        operation: operation,

        result: result,

        time:
            new Date()
                .toLocaleTimeString()

    });


    if (history.length > 30) {

        history.pop();

    }


    displayHistory();

}



function displayHistory() {


    const list =
        document.getElementById(
            "historyList"
        );


    if (history.length === 0) {


        list.innerHTML =
            "No calculations yet.";


        return;

    }


    list.innerHTML =
        history
            .map(item => `

                <div class="history-item">

                    <div>

                        <div class="history-operation">

                            ${escapeHTML(
                                item.operation
                            )}

                        </div>

                        <div class="history-time">

                            ${escapeHTML(
                                item.time
                            )}

                        </div>

                    </div>


                    <div class="history-result">

                        ${escapeHTML(
                            String(item.result)
                        )}

                    </div>

                </div>

            `)
            .join("");

}



/* CLEAR HISTORY */

document
    .getElementById("clearHistory")
    .addEventListener(
        "click",
        () => {

            history = [];

            displayHistory();

        }
    );


/* =========================================
   CLEAR / FORMAT HELPERS
   ========================================= */

function formatNumber(number) {


    if (!Number.isFinite(number)) {

        return "Invalid result";

    }


    if (Number.isInteger(number)) {

        return number.toString();

    }


    return Number(
        number.toFixed(8)
    ).toString();

}



function escapeHTML(value) {


    return value

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   INITIALIZE
   ========================================= */

updateAdvancedInputs();

displayHistory();