
// это форма редактирования имени

const popupEdit = document.querySelector('.popup_edit');  // нашли div с popup-ом (редактирование имени)
const popupOpenButton = document.querySelector('.profile__edit-button');  //нашли кнопку "редактировать"
const popupCloseButton = popupEdit.querySelector('.popup__button-close');  // Кнопка закрыть (не сохраняем)

// Находим форму в DOM
const formElement = popupEdit.querySelector('.popup__form_edit');// нашли форму
// Находим поля формы в DOM

const nameInput = formElement.querySelector('.popup__field_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__field_description');// Воспользуйтесь инструментом .querySelector()

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const togglePopup = function () { //Открываем-закрываем popup
    popupEdit.classList.toggle('popup_opened');
    
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


/* тут будем писать обработчик кнопки add */


// это форма редактирования имени

const popupAdd = document.querySelector('.popup_addcard');  // нашли div с popup-ом (добавление карточки)
const popupAddButton = document.querySelector('.profile__add-button');  //нашли кнопку "добавить"
const popupAddCloseButton = popupAdd.querySelector('.popup__buttonadd-close');  // Кнопка закрыть (не сохраняем)

// Находим форму в DOM
const formAddElement = popupAdd.querySelector('.popup__form_add');// нашли форму

// Находим поля формы в DOM



const toggleAddPopup = function () { //Открываем-закрываем popup
    popupAdd.classList.toggle('popup_opened');
    
}

const justAddOpen = function  () {  // открываем пустой popup добавления карточки
    // очистить данные формы:

    
    toggleAddPopup ();
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formAddSubmitHandler (evt) {
    evt.preventDefault(); 

//тут добавляем карточку

    const elementTemplate = document.querySelector('#element').content; //выбираем шаблон и забираем его содержимое
    const elementsSection = document.querySelector('.elements'); //секция, куда будем вставлять карточки
    const elementItem = elementTemplate.querySelector('.element').cloneNode(true);  //клонировали

    //наполняем

    const placeInput = formAddElement.querySelector('.popup__field_place');// Воспользуйтесь инструментом .querySelector()
    const linkInput = formAddElement.querySelector('.popup__field_link');// Воспользуйтесь инструментом .querySelector()
       

    elementItem.querySelector('.element__image').src = linkInput.value;  //url
    elementItem.querySelector('.element__image').alt = placeInput.value;  //alt
    elementItem.querySelector('.element__title').textContent = placeInput.value;  //название карточки

    // добавляем на кнопку лайк слушателя и переключатель
    elementItem.querySelector('.element__heart').addEventListener('click',function (evt) {
      
      evt.target.classList.toggle('element__heart_active');
      
    } );



    // добавляем на кнопку удаления слушателя и удаляем карточку по клику
    elementItem.querySelector('.element__delete').addEventListener('click',function (evt) {
      
      /*qqq = evt.target;
      qqqItem = qqq.closest('.element');
      qqqItem.remove();*/
      //evt.target.classList.toggle('element__heart_active');
    } );

    //добавляем в секцию
    elementsSection.prepend(elementItem);
    
    toggleAddPopup ();

}





/* закончили обрабатывать add */




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
    
      // добавляем на кнопку лайк слушателя и переключателя стиля
    elementItem.querySelector('.element__heart').addEventListener('click',function (evt) {
      evt.target.classList.toggle('element__heart_active');
    } );

    //добавляем в секцию
    elementsSection.append(elementItem);
});













// Прикрепляем обработчики

formElement.addEventListener('submit', formSubmitHandler); //отправка формы сохранения Жак-Ив кусто
popupOpenButton.addEventListener('click', justOpen); //клик на открытии (кнопка редактирования)
popupCloseButton.addEventListener('click', togglePopup); //клик на закрытии формы (крестик)



formAddElement.addEventListener('submit', formAddSubmitHandler); //отправка формы сохранения карточки - добавить карточку
popupAddButton.addEventListener('click', justAddOpen);  //клик на открытии (кнопка добавить)
popupAddCloseButton.addEventListener('click', toggleAddPopup);  // закрыли форму, не добавляем карточку