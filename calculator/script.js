const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearDis = document.querySelector(".clear");
const delet = document.querySelector(".del");
const equal = document.querySelector(".equal");
const prevResult = document.querySelector(".prev-result");
const liveResult = document.querySelector(".live-result");

let actualAction = ''
let previousAction = ''
let operation = undefined

const calculate = () => {
    let action
    if(!previousAction || !actualAction) {
        return
    }

    const prev = parseFloat(previousAction)
    const actual = parseFloat(actualAction)

    if(isNaN(prev) || isNaN(actual)) {
        return
    }

    switch (operation) {
        case '+':
            action = prev + actual
            break;
        case '-':
            action = prev - actual
            break;
        case '×':
            action = prev * actual
            break;
        case '÷':
            if(actual === 0) {
                clearAll()
                return
            }
                action = prev / actual
            break;
        case '√':
            action = Math.pow(prev, 1/actual)
            break;
            case '%':
                action = prev / 100 * actual
                break;
            case '^':
                action = Math.pow(prev, actual)
                break;
            case 'log':
                action = Math.log(prev) / Math.log(actual)
                break;
        default:
            return
    }
    actualAction = action
    operation = undefined
    previousAction = ''
}

const addOperators = (operator) => {
    if(actualAction === '') {
        return
    }
    if(previousAction !== '') {
        const prev = prevResult.innerText
        if(actualAction.toString() === '0' && prev[prev.length-1] === '÷') {
            clearAll()
            return
        }
        calculate()
    }
    operation = operator
    previousAction = actualAction
    actualAction = ''
}

const updateResult = () => {
    liveResult.innerText = actualAction
    if (operation != null) {
        prevResult.innerText = previousAction + operation
    } else {
        prevResult.innerText = ''
    }
}

const addNumbers = (number) => {
    if(number === '•') {
        if(actualAction.includes('.')) {
            return
        } 
        number = '.'
    }
    actualAction = actualAction.toString() + number.toString()
}

const delNumber = () => {
    actualAction = actualAction.toString().slice(0, -1)
}

const clearAll = () => {
    actualAction = ''
    previousAction = ''
    operation = undefined
}

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        addNumbers(number.innerText)
        updateResult()
    })
})

delet.addEventListener("click", () => {
    delNumber();
    updateResult();
})

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        addOperators(operator.innerText)
        updateResult()
    })
});

equal.addEventListener("click", () => {
    calculate()
    updateResult()
})
clearDis.addEventListener("click",() => {
    clearAll()
    updateResult()
});