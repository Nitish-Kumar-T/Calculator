function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    try {
        let result = display.value;
        if (result.includes('√')) {
            result = result.replace('√', 'Math.sqrt(') + ')';
        }
        if (result.includes('^')) {
            result = result.replace('^', '**');
        }
        display.value = eval(result);
    } catch (error) {
        display.value = 'Error';
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    const clearBtn = document.getElementById('clear');
    const equalsBtn = document.getElementById('equals');
    const backspaceBtn = document.getElementById('backspace');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number') || button.classList.contains('operator')) {
                appendToDisplay(button.dataset.value);
            }
        });
    });

    clearBtn.addEventListener('click', clearDisplay);
    equalsBtn.addEventListener('click', calculate);
    backspaceBtn.addEventListener('click', backspace);

    document.addEventListener('keydown', handleKeyPress);
});


function backspace() {
    display.value = display.value.slice(0, -1);
}

function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9\.\+\-\*\/\^\%]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}