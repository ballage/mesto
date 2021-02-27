const showInputError = (inputElement, errorMessage, selectors) => {
    const formSectionElement = inputElement.closest(selectors.formSection);
    const errorElement = formSectionElement.querySelector(selectors.inputErrorClass);
  
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  };
  
  const hideInputError = (inputElement, selectors) => {
    const formSectionElement = inputElement.closest(selectors.formSection);
    const errorElement = formSectionElement.querySelector(selectors.inputErrorClass);
  
    errorElement.textContent = "";
    errorElement.classList.remove(selectors.errorClass);
  };
  
  
  
  const checkInputValidity = (formElement, inputElement, selectors) => {
    const isInputNotValid = !inputElement.validity.valid;
  
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
  
      showInputError(inputElement, errorMessage, selectors);
    } else {
      hideInputError(inputElement, selectors);
    }
  };
  
  const toggleButtonState = (inputList, buttonElement, selectors) => {
    const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
    const hasNotValidInput = inputList.some(findAtLeastOneNotValid);
  
    if (hasNotValidInput) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  };
  
  const setEventListeners = (formElement, selectors) => {
    const handleFormSubmit = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", handleFormSubmit);
  
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    
  
    const inputListIterator = (inputElement) => {
      
      const handleInput = () => {
        
        checkInputValidity(formElement, inputElement, selectors);
        toggleButtonState(inputList, buttonElement, selectors);
      };
  
      inputElement.addEventListener("input", handleInput);
    };
  
    inputList.forEach(inputListIterator);
  
    toggleButtonState(inputList, buttonElement, selectors);
  };
  
  const enableValidation = (selectors) => {
    const formElements = document.querySelectorAll(selectors.formSelector);
    const formList = Array.from(formElements);
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, selectors);
    });
  };



  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: '.popup__input-error',
    formSection: '.popup__formsection',
    errorClass: 'popup__input-error_active'
  });
  