import '../pages/index.css'
import {createCard, deleteCard, handleLike} from "../components/card";
import {initialCards} from "./cards"
import {openModal, closeModal} from '../components/modal'

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
const newPlaceForm = document.forms['new-place']

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



initialCards.forEach((card) => {
    renderCard(card, "append");
});


document.querySelector('.profile__add-button')
    .addEventListener('click', () => {
        openModal(newCardModal);
    })


document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openModal(editProfileModal);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent
})


document.querySelectorAll('.popup__close').forEach(cur => {
    cur.addEventListener('click', () => closeModal(cur.closest('.popup')))
})


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