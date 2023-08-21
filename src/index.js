import './pages/index.css';

import { Card } from "./scripts/components/Card.js"
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
} from "./scripts/utils/constants.js";
import FormValidator from "./scripts/components/FormValidator.js";
import Section from './scripts/components/Section.js';
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";

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
