import './index.css';

import { Card } from "../scripts/components/Card.js"
import { formValidatorConfig,
  editButton,
  addCardButton,
  userInfoConfig,
  popupImageSelector,
  popupProfileSelector,
  popupAddCardSelector,
  templateSelector,
  popupProfile,
  formCard,
  galleryList,
  popupEditAvatarSelector,
  editAvatarButton,
  fordEditAvatar,
  popupDeleteCardSelector
} from "../scripts/utils/constants.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Api from "../scripts/components/Api.js"
import PopupWithDeleteForm from "../scripts/components/PopupWithDeleteForm";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74/',
  headers: {
    authorization: '2df54e82-a7fc-4317-91ae-bd7672a9b070',
    'Content-Type': 'application/json'
  }
});


const formEditProfile = new FormValidator(formValidatorConfig, popupProfile);
formEditProfile.enableValidation();

const formAddCard = new FormValidator(formValidatorConfig, formCard);
formAddCard.enableValidation();

const formEditAvatar = new FormValidator(formValidatorConfig, fordEditAvatar);
formEditAvatar.enableValidation();

const popupImage = new PopupWithImage(popupImageSelector);
const userInfo = new UserInfo(userInfoConfig);

const section = new Section((el) => {
  section.addItemAppend(createCard(el))}, galleryList);

const popupProfileEdit = new PopupWithForm(popupProfileSelector, (item) => {
  api.setUserInfo(item)
    .then(res => {
      userInfo.setUserInfo({username: res.name, description: res.about, avatar: res.avatar})
    })
    .catch(err => console.log(`Не удалось сохранить профиль: ${err}`))
    .finally(() => popupProfileEdit.resetButtonText())
  formEditProfile.resetValidation();
  popupProfileEdit.close();
})

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  api.setAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar })
    })
    .catch((err) => console.log(`Не удалось обновить аватар: ${err}`))
    .finally(() => popupEditAvatar.resetButtonText())
  formEditAvatar.resetValidation();
  popupEditAvatar.close();
});

const popupDelete = new PopupWithDeleteForm(popupDeleteCardSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch(err => console.log(`Не удалось удалить карточку: ${err}`))
    .finally(() => popupDelete.resetButtonText())

  popupDelete.close();
})

const popupAddCard = new PopupWithForm(popupAddCardSelector, (item) => {
  Promise.all([api.getInfo(), api.addCard(item)])
    .then(([dataUser, dataCard]) => {
      dataCard.myId = dataUser._id;
      section.addItemPrepend(createCard(dataCard));
      formAddCard.resetValidation();
      popupAddCard.close();
    })
    .catch((err) => console.log(`Не удалось загрузить данные: ${err}`))
    .finally(() => popupAddCard.resetButtonText())
});

function createCard(el) {
  const card = new Card(el, templateSelector, popupImage.open, popupDelete.open, (likeElement, cardId) => {
    if(likeElement.classList.contains('gallery__button-like_active')) {
      api.removeLike(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((err) => console.log(err))
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLike(res.likes);
        })
        .catch((err) => console.log(`Не удалось создать карточку: ${err}`))
    }
  });
  return card.generateCard();
}

editButton.addEventListener('click', function() {
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  popupProfileEdit.open();
});

addCardButton.addEventListener('click', function() {
  popupAddCard.open();
});

editAvatarButton.addEventListener('click', function() {
  popupEditAvatar.open();
});

popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupProfileEdit.setEventListeners();
popupEditAvatar.setEventListeners();
popupDelete.setEventListeners();

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    cardData.forEach(el => el.myId = userData._id)
    userInfo.setUserInfo({username: userData.name, description: userData.about, avatar: userData.avatar})
    section.renderItems(cardData)
  })
  .catch((err) => console.log(`Ошибка загрузки данных: ${err}`))
