function getById(id) {
    return document.getElementById(id);
}

const minusBtn = getById("minus-btn");
const plusBtn = getById("plus-btn");
const passengersCounter = getById("passenger-count");
let counter = 1;

minusBtn.addEventListener("click", () => changeCount(operands.MINUS));
plusBtn.addEventListener("click", () => changeCount(operands.PLUS));

const operands = {
    PLUS: "+",
    MINUS: "-"
}

function changeCount(operand) {
    if (operand === operands.PLUS) {
        counter += 1;
    } else {
        if (counter > 1) counter -= 1;
    }

    passengersCounter.textContent = counter;
}

function getPassengersCounter() {
    return counter;
}

export default getPassengersCounter; 