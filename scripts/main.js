// объявляем переменные

// блок редактирования имени/профессии
const popupEdit = document.querySelector('.popup_edit');  // нашли блок - div с popup-ом (редактирование имени/профессии)
const popupCloseButton = popupEdit.querySelector('.popup__button-close');  // в этом блоке нашли кнопку закрыть - крестик (не сохраняем форму)
const formElement = popupEdit.querySelector('.popup__form_edit'); // нашли форму (в блоке )

const nameInput = formElement.querySelector('.popup__field_name'); // забрали в переменную то что ввёл юзер в качестве имени
const jobInput = formElement.querySelector('.popup__field_description');// забрали в переменную то что ввёл юзер в качестве профессии

const profileName = document.querySelector('.profile__name'); // нашли в документе блок с именем, забрали его в переменную
const profileDescription = document.querySelector('.profile__description'); // нашли в документе блок с профессией, забрали её в переменную

const popupEditButton = document.querySelector('.profile__edit-button');  // нашли на странице кнопку "редактировать имя/профессию"

// конец блока редактирования имени/профессии, объявили все переменные

/* обработчик кнопки закрытия всплывашки изображения  */ 

const popupImage = document.querySelector('.popup_image');  // нашли div с popup-ом ()
const popupImageItem = document.querySelector('.popup__openedimage');  //нашли картинку
const popupImageTitle = document.querySelector('.popup__openedtitle');  //нашли title картинки
const popupImageCloseButton = popupImage.querySelector('.popup__button-photo-close');  // Кнопка закрыть изображение

/* конец обработчик кнопки закрытия всплывашки изображения  */ 

/* переменные для  добавления карточки */

const popupAdd = document.querySelector('.popup_addcard');  // нашли div с popup-ом (добавление карточки)
const popupAddButton = document.querySelector('.profile__add-button');  //нашли кнопку "добавить"
const popupAddCloseButton = popupAdd.querySelector('.popup__buttonadd-close');  // Кнопка закрыть (не сохраняем)

const formAddElement = popupAdd.querySelector('.popup__form_add');// нашли форму добавления карточки
const elementsSection = document.querySelector('.elements'); //секция, куда будем вставлять карточки


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

// Блок с функциями

const togglePopup = function (popup) {  // функция открытия/закрытия любого popup  
  popup.classList.toggle('popup_opened');  
}

const popupEditOpen = function  () {  // открываем popup с редактированием имени/профессии и подгружаем в него данные со страницы
    
  nameInput.value = profileName.textContent;  //Имя: в форму из DOM
  jobInput.value = profileDescription.textContent;  //Профессия:  в форму из DOM
  togglePopup(popupEdit); //открыли popup    
}



const formEditSubmitHandler = function (evt) {  // отправлена форма сохранения имени/профессии
    evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
    profileName.textContent = nameInput.value; //Имя: из формы в DOM
    profileDescription.textContent = jobInput.value;//Профессия: из формы в DOM
    togglePopup (popupEdit);  //закрыли popup
}


const popupAddOpen = function  () {  // открываем пустой popup добавления карточки
    // можно бы очистить данные формы:
    togglePopup(popupAdd);
}


const createCard = function (link, place) {  // функция создания карточки  

  const elementTemplate = document.querySelector('#element').content; //выбираем шаблон и забираем его содержимое
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);  //клонировали

  const elementImageItem = elementItem.querySelector('.element__image');
  
  elementImageItem.src = link;  //url изображения
  elementImageItem.alt = place;  //alt изображения
  elementItem.querySelector('.element__title').textContent = place;  //название карточки
    

  // добавляем на кнопку лайк слушателя и переключатель
  elementItem.querySelector('.element__heart').addEventListener('click',function (evt) {
    evt.target.classList.toggle('element__heart_active');    
  });


  // добавляем на кнопку удаления слушателя и удаляем карточку по клику
  elementItem.querySelector('.element__delete').addEventListener('click',function (evt) {    
    deleteTarget = evt.target;
    deleteItem = deleteTarget.closest('.element');
    deleteItem.remove();
  });

  // добавили слушателя на изображение (всплывашка картинки)
  elementItem.querySelector('.element__image').addEventListener('click',function (evt) {
  const popupImageTarget = evt.target;
  const popupImageSrc = popupImageTarget.src;

  popupImageItem.src = popupImageSrc; // поменяли у неё src на текущий
  popupImageTitle.textContent = popupImageTarget.alt; // поменяли alt

  togglePopup(popupImage);  //открыли popup
  });


  return elementItem;  //вернули карточку

}  // конец функции создания карточки



const formAddSubmitHandler = function (evt) {
  evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет

  const placeInput = formAddElement.querySelector('.popup__field_place');  //выцепили данные из полей формы
  const linkInput = formAddElement.querySelector('.popup__field_link');

  const elementItem = createCard(linkInput.value, placeInput.value);  //вызываем функцию добавления, передаём ей аргументы из формы

  elementsSection.prepend(elementItem); //добавляем в начало секции

  togglePopup(popupAdd); // закрываем popup

}  // конец добавления карточки

// конец блока с описанием функций


// при загрузке страницы обходим весь массив, формируя карточки

initialCards.forEach(function (item) {
  const elementItem = createCard(item.link, item.name);
  elementsSection.append(elementItem);    //добавляем в конец секции
});


// Прикрепляем обработчики

formElement.addEventListener('submit', formEditSubmitHandler); //отправка формы сохранения Имени/Профессии
popupEditButton.addEventListener('click', popupEditOpen); //клик на открытии (кнопка редактирования Имени/Профессии)


popupCloseButton.addEventListener('click', function () {
  togglePopup(popupEdit); //клик на закрытии формы редактирования (крестик)
});


formAddElement.addEventListener('submit', formAddSubmitHandler); //отправка формы сохранения карточки - добавить карточку

popupAddButton.addEventListener('click', popupAddOpen);  //клик на кнопке добавить карточку


popupAddCloseButton.addEventListener('click', function () {
  togglePopup(popupAdd); // закрыли форму (крестик), не добавляем карточку
});


popupImageCloseButton.addEventListener('click', function () {
  togglePopup(popupImage); // закрыли всплывашку с картинкой
});