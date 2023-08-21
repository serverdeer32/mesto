import '../pages/index.css';

import { Card } from "./components/Card.js"
import { formValidatorConfig,
  initialCards,
  editButton,
  addCardButton,
  userInfoConfig,
  popupImageSelector,
  popupProfileSelector,
  popupAddCardSelector,
  templateSelector,
  popupProfile,
  formCard,
  galleryList
} from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Section from './components/Section.js';
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";

const formEditProfile = new FormValidator(formValidatorConfig, popupProfile);
formEditProfile.enableValidation();

const formAddCard = new FormValidator(formValidatorConfig, formCard);
formAddCard.enableValidation();

const popupImage = new PopupWithImage(popupImageSelector);
const userInfo = new UserInfo(userInfoConfig);

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateSelector, popupImage.open);
    return card.generateCard();
  }
}, galleryList);

const popupProfileEdit = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfileEdit.getInputValues());
  popupProfileEdit.close();
})

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValues()));
  popupAddCard.close();
});

editButton.addEventListener('click', function() {
  popupProfileEdit.setInputValues(userInfo.getUserInfo());
  popupProfileEdit.open();
});

addCardButton.addEventListener('click', function() {
  popupAddCard.open();
});

popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupProfileEdit.setEventListeners();

section.renderItems();
