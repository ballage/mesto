
let popup = document.querySelector('.popup');  // нашли div с popup-ом
let popupOpenButton = document.querySelector('.profile__edit-button');  //нашли кнопку "редактировать"
let popupCloseButton = popup.querySelector('.popup__button-close');  // Кнопка закрыть (не сохраняем)

// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');// нашли форму
// Находим поля формы в DOM

let nameInput = formElement.querySelector('.popup__field_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__field_description');// Воспользуйтесь инструментом .querySelector()

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let togglePopup = function () { //Открываем-закрываем popup
    popup.classList.toggle('popup_opened');
}


const justOpen = function  () {  // открываем popup и подгружаем в него данные со страницы
    

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    
    togglePopup ();
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    
    togglePopup ();


}
// объявляем массив с данными для формирования карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


// обходим весь массив, формируя карточки

initialCards.forEach(function (item) {

    const elementTemplate = document.querySelector('#element').content; //выбираем шаблон и забираем его содержимое
    const elementsSection = document.querySelector('.elements'); //секция, куда будем вставлять карточки
    const elementItem = elementTemplate.querySelector('.element').cloneNode(true);  //клонировали

    //наполняем
    elementItem.querySelector('.element__image').src = item.link;  //url
    elementItem.querySelector('.element__image').alt = item.name;  //alt
    elementItem.querySelector('.element__title').textContent = item.name;  //название карточки

    //добавляем в секцию
    elementsSection.append(elementItem);
});















// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', justOpen); 
popupCloseButton.addEventListener('click', togglePopup);