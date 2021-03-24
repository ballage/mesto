import {openPopup} from './index.js'

export class Card {
    constructor (data, selector) {
        this._name = data.name;        
        this._link = data.link;
        this._selector = selector;
        
    }

    _getTemplate() {
      const elementItem = document
      .querySelector(this._selector).content
      .querySelector('.element').cloneNode(true);

           
      return elementItem;
    }

    

    generateCard() {  //публичный метод генерации карточки
        this._element = this._getTemplate();

        this._setEventListeners();

        const elementImageItem = this._element.querySelector('.element__image');
      
        elementImageItem.alt = this._name;  //alt изображения
        elementImageItem.src = this._link;  //url изображения
        this._element.querySelector('.element__title').textContent = this._name;  //название карточки
        
        return this._element;
    }

    

    _setEventListeners() {
      
      this._element.querySelector('.element__heart').addEventListener('click', () => {  //слушатель на кнопке лайка
        this._handleHeartClick();
      })

      this._element.querySelector('.element__delete').addEventListener('click', () => {  //слушатель на кнопке удаления
        this._handleDeleteClick();
      })

      this._element.querySelector('.element__image').addEventListener('click', () => {  //слушатель на всплывашке картинки
        this._handleImageClick();
      })

    }

    _handleHeartClick() {
      this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
    }

    _handleDeleteClick() {
      this._element.closest('.element').remove();
    }

    _handleImageClick() {  //создаем изображение и вешаем слушатели
      const popupImage = document.querySelector('.popup__image');  // нашли div с popup-ом ()
      const popupImageItem = document.querySelector('.popup__image_opened');  //нашли картинку
      const popupImageTitle = document.querySelector('.popup__openedtitle');  //нашли title картинки

      const popupImageElement = this._element.querySelector('.element__image');
    
      
      const popupImageSrc = popupImageElement.src;
      const popupImageAlt = popupImageElement.alt;
      

      popupImageItem.src = popupImageSrc; // поменяли у неё src на текущий
      popupImageTitle.textContent = popupImageAlt; // поменяли alt
        
      openPopup(popupImage);  //открыли popup

    }
   
}