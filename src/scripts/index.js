import '../pages/index.css'
import {createCard, deleteCard, handleLike} from "../components/card";
import {initialCards} from "./cards"
import {openModal, closeModal} from '../components/modal'
import {enableValidation, clearValidation} from "./validation";
import {getCards, getUser} from "./api";

const cardsList = document.querySelector('.places__list');

const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const editProfileModal = document.querySelector('.popup_type_edit');

const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile']
const profileName = document.querySelector('.profile__title')
const profileNameInput = editProfileForm.elements.name;
const profileDescription = document.querySelector('.profile__description');
const profileDescriptionInput = editProfileForm.elements.description;
const profileAvatar = document.querySelector('.profile__image');
const newPlaceForm = document.forms['new-place']
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClass: 'popup__input-error_active',
    inputErrorClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled'
}

function handleImageClick(evt) {
    imageModalImage.src = evt.target.src;
    imageModalImage.alt = evt.target.alt;
    imageModalCaption.textContent = evt.target.alt;
    openModal(imageModal)
}


function renderCard(item, method = "prepend") {
    const cardElement = createCard(item, {deleteCard, handleLike, handleImageClick});
    cardsList[method](cardElement);
}

function renderPage() {
    Promise.all([getUser(), getCards()]).then(responses => {
        if (responses.every(res => res.ok))
            return Promise.all(responses.map(res=>res.json()))
        else return responses.map(res=>Promise.reject(res.status))
        }).catch(err => console.log(err))
        .then(data => {
            const userData = data[0]
            const cards = data[1]
            profileName.innerText = userData.name;
            profileDescription.innerText = userData.about;
            profileAvatar.style.backgroundImage = 'url(' + userData.avatar + ')';
            cards.forEach((card) => {
                renderCard(card, "append");
            });
        });
}
renderPage()



document.querySelector('.profile__add-button')
    .addEventListener('click', () => {
        openModal(newCardModal);
        newPlaceForm.reset();
        clearValidation(newPlaceForm, validationSettings)
    })


document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openModal(editProfileModal);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent
    clearValidation(editProfileForm, validationSettings)
})


document.querySelectorAll('.popup__close').forEach(cur => {
    cur.addEventListener('click', () => {
        const curPopup = cur.closest('.popup')
        closeModal(curPopup)
    })
})

enableValidation(validationSettings)


editProfileForm.addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(editProfileModal);
})

newPlaceForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const placeNameInput = newPlaceForm.elements['place-name']
    const placeLinkInput = newPlaceForm.elements.link
    renderCard({name: placeNameInput.value, link: placeLinkInput.value});
    newPlaceForm.reset();
    closeModal(newCardModal);
})


