import {initialCards, validateSettings} from './data.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'


const popupEdit = document.querySelector('.popup_edit');  // нашли блок - div с popup-ом (редактирование имени/профессии)
const formElement = popupEdit.querySelector('.popup__form_edit'); // нашли форму (в блоке )
const popupEditButton = document.querySelector('.profile__edit-button');  // нашли на странице кнопку "редактировать имя/профессию"

const nameInput = formElement.querySelector('.popup__field_name'); // забрали в переменную то что ввёл юзер в качестве имени
const jobInput = formElement.querySelector('.popup__field_description');// забрали в переменную то что ввёл юзер в качестве профессии

const profileName = document.querySelector('.profile__name'); // нашли в документе блок с именем, забрали его в переменную
const profileDescription = document.querySelector('.profile__description'); // нашли в документе блок с профессией, забрали её в переменную

const popupAdd = document.querySelector('.popup_addcard');  // нашли div с popup-ом (добавление карточки)
const popupAddButton = document.querySelector('.profile__add-button');  //нашли кнопку "добавить карточку"
const popupAddSave = document.querySelector('.popup__button-save_add');  //нашли кнопку "сохранить" в popup "добавить карточку"

const formAddElement = popupAdd.querySelector('.popup__form_add');// нашли форму добавления карточки

const addPlace = formAddElement.querySelector('.popup__field_place');  //нашли значения полей ввода
const addLink =  formAddElement.querySelector('.popup__field_link');
const elementsSection = document.querySelector('.elements'); //секция, куда будем вставлять карточки

const ESC_CODE = 'Escape';



export const togglePopup = function (popup) { // функция открытия/закрытия любого popup  
  
    if (!popup.classList.contains('popup_opened')) {  //если popup закрыт (нет класса popup_opened)
      document.addEventListener('keydown', closeByEsc);
      document.addEventListener('mousedown', closeByOverlayAndButtonClick);
  } else {
      document.removeEventListener('keydown', closeByEsc);  // иначе убираем слушателей
      document.removeEventListener('mousedown', closeByOverlayAndButtonClick);
  }
  popup.classList.toggle('popup_opened');
  
  }
  
  
function closeByEsc(evt) {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopup(openedPopup); 
      }
    }
  
function closeByOverlayAndButtonClick(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopup(openedPopup); 
      }
    }

const popupAddOpen = function  () {  // открываем пустой popup добавления карточки
    formAddElement.reset();  //обнулили значение полей формы
  
    popupAddSave.classList.add(validateSettings.inactiveButtonClass);  // деактивируем кнопку submit формы добавления карточки    
    popupAddSave.setAttribute("disabled", "disabled");
    
    togglePopup(popupAdd);  // открыли popup
  }
  


const popupEditOpen = function () {  // открываем popup с редактированием имени/профессии и подгружаем в него данные со страницы
    nameInput.value = profileName.textContent;  //Имя: в форму из DOM
    jobInput.value = profileDescription.textContent;  //Профессия:  в форму из DOM
      
    togglePopup(popupEdit); //открыли popup    
  }


const formEditSubmitHandler = function (evt) {  // отправлена форма сохранения имени/профессии
    evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
    profileName.textContent = nameInput.value; //Имя: из формы в DOM
    profileDescription.textContent = jobInput.value;//Профессия: из формы в DOM
    //removeListenersFromEditAndClose(evt);
  
    togglePopup(popupEdit); //закрыли popup    
  
  }

    
const formAddSubmitHandler = function (evt) {
    evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  
    const card = new Card({name: addPlace.value, link: addLink.value}, '#element');  //создаём карточку из класса, передаём ему аргументы из формы
    const elementItem = card.generateCard();
    elementsSection.prepend(elementItem); //добавляем в начало секции
  
    togglePopup(popupAdd); //закрыли popup  
    
  } 
  
  //слушатели

  popupAddButton.addEventListener('click', popupAddOpen);  // слушатель на клик по кнопке добавления карточки
  popupEditButton.addEventListener('click', popupEditOpen); // слушатель на кнопке редактирования Имени/Профессии
  formElement.addEventListener('submit', formEditSubmitHandler); // отправка формы сохранения Имени/Профессии
  formAddElement.addEventListener('submit', formAddSubmitHandler); // отправка формы добавления карточки
  
  
/* проходим по массиву данных, создаём карточки, заполняем страницу */

initialCards.forEach((item) => {
    const card = new Card(item, '#element');
    const elementItem = card.generateCard();
    
    elementsSection.append(elementItem);  //добавляем в конец секции
})

//включаем валидацию форм

const addForm = new FormValidator (validateSettings, '.popup__form_add').enableValidation();
const editForm = new FormValidator (validateSettings, '.popup__form_edit').enableValidation();