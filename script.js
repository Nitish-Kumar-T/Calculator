function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = display.value;
        result = result.replace(/\^/g, '**');
        display.value = eval(result);
    } catch (error) {
        display.value = 'Error';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    const clearBtn = document.getElementById('clear');
    const equalsBtn = document.getElementById('equals');
    const backspaceBtn = document.getElementById('backspace');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number') || button.classList.contains('operator') || 
                button.classList.contains('function') || button.classList.contains('constant')) {
                appendToDisplay(button.dataset.value);
            } else if (button.classList.contains('memory')) {
                handleMemory(button.dataset.action);
            }
        });
    });

    clearBtn.addEventListener('click', clearDisplay);
    equalsBtn.addEventListener('click', calculate);
    backspaceBtn.addEventListener('click', backspace);

    document.addEventListener('keydown', handleKeyPress);
});

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9\.\+\-\*\/\^\(\)]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}