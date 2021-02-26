// объявляем переменные

// блок редактирования имени/профессии

const popupEdit = document.querySelector('.popup_edit');  // нашли блок - div с popup-ом (редактирование имени/профессии)
const formElement = popupEdit.querySelector('.popup__form_edit'); // нашли форму (в блоке )
const popupEditButton = document.querySelector('.profile__edit-button');  // нашли на странице кнопку "редактировать имя/профессию"


const nameInput = formElement.querySelector('.popup__field_name'); // забрали в переменную то что ввёл юзер в качестве имени
const jobInput = formElement.querySelector('.popup__field_description');// забрали в переменную то что ввёл юзер в качестве профессии

const profileName = document.querySelector('.profile__name'); // нашли в документе блок с именем, забрали его в переменную
const profileDescription = document.querySelector('.profile__description'); // нашли в документе блок с профессией, забрали её в переменную

// конец блока редактирования имени/профессии, объявили все переменные

/* обработчик кнопки закрытия всплывашки изображения  */ 

const popupImage = document.querySelector('.popup_image');  // нашли div с popup-ом ()
const popupImageItem = document.querySelector('.popup__openedimage');  //нашли картинку
const popupImageTitle = document.querySelector('.popup__openedtitle');  //нашли title картинки

/* конец обработчик кнопки закрытия всплывашки изображения  */ 

/* переменные для  добавления карточки */

const popupAdd = document.querySelector('.popup_addcard');  // нашли div с popup-ом (добавление карточки)
const popupAddButton = document.querySelector('.profile__add-button');  //нашли кнопку "добавить"

const formAddElement = popupAdd.querySelector('.popup__form_add');// нашли форму добавления карточки
const elementsSection = document.querySelector('.elements'); //секция, куда будем вставлять карточки

const addPlace = formAddElement.querySelector('.popup__field_place');  //нашли значения полей ввода
const addLink =  formAddElement.querySelector('.popup__field_link');



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


const removeListenersFromImageAndClose = function (evt) {  // удаляем слушателей и закрываем popup
  document.removeEventListener('keydown', ESCImageClose);  //удаляем слушателей с клавиатуры
  evt.target.removeEventListener('click', callbackForImage);  //удаляем слушателя с мыши
  
  togglePopup(popupImage); //закрыли popup    
}


const ESCImageClose = function (evt) {  //нажата кнопка Esc
  if (evt.key == 'Escape') {      
    removeListenersFromImageAndClose(evt);
  }
}

const callbackForImage = function (evt) {  //клик по крестику или оверлею
  if (evt.target.classList.contains('popup_image') || evt.target.classList.contains('popup__button-close')) {
    removeListenersFromImageAndClose(evt);
  }  
}


const popupImageOnCreate = function (evt) {  //создаем изображение и вешаем слушатели
  const popupImageTarget = evt.target;
  const popupImageSrc = popupImageTarget.src;

  popupImageItem.src = popupImageSrc; // поменяли у неё src на текущий
  popupImageTitle.textContent = popupImageTarget.alt; // поменяли alt
  
  popupImage.addEventListener('click', callbackForImage);  // вешаем слушателя на оверлей и крестик  
  document.addEventListener('keydown', ESCImageClose); // вешаем слушателя на esc
  togglePopup(popupImage);  //открыли popup

  
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
  elementImageItem.addEventListener('click', popupImageOnCreate); 


  return elementItem;  //вернули карточку

}  // конец функции создания карточки


// конец блока с описанием функций


// при загрузке страницы обходим весь массив, формируя карточки

initialCards.forEach(function (item) {
  const elementItem = createCard(item.link, item.name);
  elementsSection.append(elementItem);    //добавляем в конец секции
});



/* БОЛЬШОЙ БЛОК СЛУШАТЕЛЕЙ */


/* слушатели на popup редактирования имени/профессии */

const removeListenersFromEditAndClose = function (evt) {  // удаляем слушателей и закрываем popup
  document.removeEventListener('keydown',ESCEditClose);  //удаляем слушателей с клавиатуры
  evt.target.removeEventListener('click', callbackForEdit);  //удаляем слушателя с мыши
  evt.target.removeEventListener('click', formEditSubmitHandler);   //удаляем слушателя с кнопки сохранить
  togglePopup(popupEdit); //закрыли popup    
}


const callbackForEdit = function (evt) {  //клик по крестику или оверлею
  if (evt.target.classList.contains('popup_edit') || evt.target.classList.contains('popup__buttonedit-close')) {
    removeListenersFromEditAndClose(evt);   
  }  
}

const ESCEditClose = function (evt) {  //нажата кнопка Esc
  if (evt.key == 'Escape') {      
    removeListenersFromEditAndClose(evt);
  }
}

const formEditSubmitHandler = function (evt) {  // отправлена форма сохранения имени/профессии
  evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  profileName.textContent = nameInput.value; //Имя: из формы в DOM
  profileDescription.textContent = jobInput.value;//Профессия: из формы в DOM
  removeListenersFromEditAndClose(evt);
}

const popupEditOpen = function  (evt) {  // открываем popup с редактированием имени/профессии и подгружаем в него данные со страницы
  nameInput.value = profileName.textContent;  //Имя: в форму из DOM
  jobInput.value = profileDescription.textContent;  //Профессия:  в форму из DOM
  popupEdit.addEventListener('click', callbackForEdit);  // повесили слушателя на оверлей popup-edit
  document.addEventListener('keydown', ESCEditClose); // вешаем слушателя на esc
  formElement.addEventListener('submit', formEditSubmitHandler); //отправка формы сохранения Имени/Профессии
  
  togglePopup(popupEdit); //открыли popup    
}

popupEditButton.addEventListener('click', popupEditOpen); // слушатель на кнопке редактирования Имени/Профессии

/* слушатели на popup кнопки добавить карточку */

const removeListenersFromAddAndClose = function (evt) {  // удаляем слушателей и закрываем popup
  document.removeEventListener('keydown',ESCAddClose);  //удаляем слушателей с клавиатуры
  evt.target.removeEventListener('click', callbackForAdd);  //удаляем слушателя с мыши
  evt.target.removeEventListener('click', formAddSubmitHandler);   //удаляем слушателя с кнопки сохранить
  togglePopup(popupAdd); //закрыли popup    
}


const callbackForAdd = function (evt) {  //клик по крестику или оверлею
  if (evt.target.classList.contains('popup_addcard') || evt.target.classList.contains('popup__buttonadd-close')) {
    removeListenersFromAddAndClose(evt);
  }  
}

const ESCAddClose = function (evt) {  //нажата кнопка Esc
  if (evt.key == 'Escape') {      
    removeListenersFromAddAndClose(evt);
  }
}

const formAddSubmitHandler = function (evt) {
  evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет

  const elementItem = createCard(addLink.value, addPlace.value);  //вызываем функцию добавления, передаём ей аргументы из формы

  elementsSection.prepend(elementItem); //добавляем в начало секции

  removeListenersFromAddAndClose(evt);

}  // конец добавления карточки


const popupAddOpen = function  () {  // открываем пустой popup добавления карточки
  addPlace.value = '';  //обнулили значение полей
  addLink.value = '';
  popupAdd.addEventListener('click', callbackForAdd);      // закрыли форму (крестик), не добавляем карточку     
  document.addEventListener('keydown', ESCAddClose); // вешаем слушателя на esc
  formAddElement.addEventListener('submit', formAddSubmitHandler); //отправка формы добавления карточки
  togglePopup(popupAdd);  // открыли popup
}

popupAddButton.addEventListener('click', popupAddOpen);  //клик на кнопке добавить карточку