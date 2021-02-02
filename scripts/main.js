
let popup = document.querySelector('.popup');  // нашли div с popup-ом
let popupOpenButton = document.querySelector('.profile__edit-button');  //нашли кнопку "редактировать"
let popupCloseButton = popup.querySelector('.popup__button-close');  // Кнопка закрыть (не сохраняем)

// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');// нашли форму
// Находим поля формы в DOM

let nameInput = formElement.querySelector('.popup__field_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__field_description');// Воспользуйтесь инструментом .querySelector()

let togglePopup = function () { //Открываем-закрываем popup
    popup.classList.toggle('popup_opened');
}


const justOpen = function  () {  // открываем popup и подгружаем в него данные со страницы
    

    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    
    togglePopup ();
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    
    togglePopup ();


}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', justOpen); 
popupCloseButton.addEventListener('click', togglePopup);