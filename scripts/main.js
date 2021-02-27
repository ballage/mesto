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
const popupAddSave = document.querySelector('.popup__button-save_add');  //нашли кнопку "сохранить" в popup "добавить карточку"

const formAddElement = popupAdd.querySelector('.popup__form_add');// нашли форму добавления карточки
const elementsSection = document.querySelector('.elements'); //секция, куда будем вставлять карточки

const addPlace = formAddElement.querySelector('.popup__field_place');  //нашли значения полей ввода
const addLink =  formAddElement.querySelector('.popup__field_link');

const elementTemplate = document.querySelector('#element').content; //выбираем шаблон и забираем его содержимое

const ESC_CODE = 'Escape';


// Блок с функциями


const togglePopup = function (popup) { // функция открытия/закрытия любого popup  
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



const popupImageOnCreate = function (evt) {  //создаем изображение и вешаем слушатели
  const popupImageTarget = evt.target;
  const popupImageSrc = popupImageTarget.src;

  popupImageItem.src = popupImageSrc; // поменяли у неё src на текущий
  popupImageTitle.textContent = popupImageTarget.alt; // поменяли alt
    
  togglePopup(popupImage);  //открыли popup
}


const createCard = function (link, place) {  // функция создания карточки  
  
  const elementItem = elementTemplate.querySelector('.element').cloneNode(true);  //клонировали шаблон карточки из шаблона (elementTemplate объявлен в начале файла)
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


const formEditSubmitHandler = function (evt) {  // отправлена форма сохранения имени/профессии
  evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  profileName.textContent = nameInput.value; //Имя: из формы в DOM
  profileDescription.textContent = jobInput.value;//Профессия: из формы в DOM
  //removeListenersFromEditAndClose(evt);

  togglePopup(popupEdit); //закрыли popup    

}

formElement.addEventListener('submit', formEditSubmitHandler); //отправка формы сохранения Имени/Профессии

const popupEditOpen = function  (evt) {  // открываем popup с редактированием имени/профессии и подгружаем в него данные со страницы
  nameInput.value = profileName.textContent;  //Имя: в форму из DOM
  jobInput.value = profileDescription.textContent;  //Профессия:  в форму из DOM
    
  togglePopup(popupEdit); //открыли popup    
}



popupEditButton.addEventListener('click', popupEditOpen); // слушатель на кнопке редактирования Имени/Профессии

const formAddSubmitHandler = function (evt) {
  evt.preventDefault(); // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет

  const elementItem = createCard(addLink.value, addPlace.value);  //вызываем функцию добавления, передаём ей аргументы из формы

  elementsSection.prepend(elementItem); //добавляем в начало секции

  togglePopup(popupAdd); //закрыли popup    

  
}  // конец добавления карточки

formAddElement.addEventListener('submit', formAddSubmitHandler); //отправка формы добавления карточки


const popupAddOpen = function  () {  // открываем пустой popup добавления карточки
  addPlace.value = '';  //обнулили значение полей
  addLink.value = '';

  popupAddSave.classList.add("popup__button-save_inactive");  // деактивируем кнопку submit формы добавления карточки
  popupAddSave.setAttribute("disabled", "disabled");
  
  togglePopup(popupAdd);  // открыли popup
}

popupAddButton.addEventListener('click', popupAddOpen);  //клик на кнопке добавить карточку


