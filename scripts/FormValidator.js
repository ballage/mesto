

export class FormValidator {
    constructor (selectors, currentFormElement) {
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._formSection = selectors.formSection;
        this._errorClass = selectors.errorClass;

        this._formElement = currentFormElement;
    }

    enableValidation() {
        const formElement = document.querySelector(this._formElement);
        this._setEventListeners(formElement);
        
      };
    
    _setEventListeners(formElement) {

        const handleFormSubmit = (event) => {
            event.preventDefault();
          };
          formElement.addEventListener("submit", handleFormSubmit);
        
          const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
          const buttonElement = formElement.querySelector(this._submitButtonSelector);          
          
        
          const inputListIterator = (inputElement) => {
            
            const handleInput = () => {
              
              this._checkInputValidity(formElement, inputElement);
              this._toggleButtonState(inputList, buttonElement);
            };
        
            inputElement.addEventListener("input", handleInput);
          };
        
          inputList.forEach(inputListIterator);
        
          this._toggleButtonState(inputList, buttonElement);


    }

    _toggleButtonState(inputList, buttonElement) {
        const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
        const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
      
        if (hasNotValidInput) {
          buttonElement.setAttribute("disabled", true);
          buttonElement.classList.add(this._inactiveButtonClass);
        } else {
          buttonElement.removeAttribute("disabled");
          buttonElement.classList.remove(this._inactiveButtonClass);
        }
      };

    _checkInputValidity(formElement, inputElement) {
        const isInputNotValid = !inputElement.validity.valid;
      
        if (isInputNotValid) {
          const errorMessage = inputElement.validationMessage;
      
          this._showInputError(inputElement, errorMessage);
        } else {
          this._hideInputError(inputElement);
        }
      };

      _showInputError(inputElement, errorMessage) {
        const formSectionElement = inputElement.closest(this._formSection);
        const errorElement = formSectionElement.querySelector(this._inputErrorClass);
      
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
      };
      
      _hideInputError (inputElement) {
        const formSectionElement = inputElement.closest(this._formSection);
        const errorElement = formSectionElement.querySelector(this._inputErrorClass);
      
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
      };


}