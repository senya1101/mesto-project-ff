export function enableValidation({
                                     formSelector,
                                     inputSelector,
                                     submitButtonSelector,
                                     inactiveButtonClass,
                                     inputErrorClass,
                                     errorClass
                                 }) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach(form => {
        const inputList = Array.from(form.querySelectorAll(inputSelector));
        const buttonElement = form.querySelector(submitButtonSelector);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass)
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                checkInputValidity(form, input, inputErrorClass, `.${input.id}-error`, errorClass)
                toggleButtonState(inputList, buttonElement, inactiveButtonClass)
            })
        })
    })
}


export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
    inputList.forEach((input) => {
        const errorElement = formElement.querySelector(`.${input.id}-error`);
        hideError(input, validationConfig.inputErrorClass, errorElement, validationConfig.errorClass)
    })
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass)
}


function checkInputValidity(formElement, inputElement, inputErrorClass, errorSelector, errorClass) {
    const errorElement = formElement.querySelector(errorSelector);

    if (inputElement.validity.valid) {
        hideError(inputElement, inputErrorClass, errorElement, errorClass)
    } else {
        showError(inputElement, inputErrorClass, errorElement, errorClass)
    }
}

function hideError(inputElement, inputErrorClass, errorElement, errorClass) {
    inputElement.classList.remove(inputErrorClass)
    errorElement.classList.add(errorClass)
    errorElement.textContent = "";
}

function showError(inputElement, inputErrorClass, errorElement, errorClass) {
    inputElement.classList.add(inputErrorClass)
    errorElement.classList.add(errorClass)
    if (inputElement.validity.patternMismatch) {
        errorElement.textContent = inputElement.dataset.errorMessage;
    } else {
        errorElement.textContent = inputElement.validationMessage;
    }
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (inputList.every(input => input.validity.valid)) {
        buttonElement.disabled = false
        buttonElement.classList.remove(inactiveButtonClass)
    } else {
        buttonElement.disabled = true
        buttonElement.classList.add(inactiveButtonClass)
    }
}


