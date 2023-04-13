let openButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__button-close')

let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = document.querySelector('input[name="popup__name-input"]')
let inputDescription = document.querySelector('input[name="popup__description-input"]');


function openPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}
openButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
