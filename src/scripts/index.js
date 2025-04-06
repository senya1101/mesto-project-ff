import '../pages/index.css'
import {createCard, deleteCard, handleLike} from "../components/card";
import {initialCards} from "./cards"
import {openModal, closeModal} from '../components/modal'

const cardsList = document.querySelector('.places__list');

const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const editProfileModal = document.querySelector('.popup_type_edit');

const editProfileForm = document.forms['edit-profile']
const profileName = document.querySelector('.profile__title')
const profileNameInput = editProfileForm.elements.name;
const profileDescription = document.querySelector('.profile__description');
const profileDescriptionInput = editProfileForm.elements.description;
const newPlaceForm = document.forms['new-place']

function handleImageClick(evt) {
    imageModal.querySelector('.popup__image').src = evt.target.src;
    imageModal.querySelector('.popup__caption').textContent = evt.target.alt;
    openModal(imageModal)
}


initialCards.forEach((card) => {
    const newCard = createCard(card, deleteCard, handleLike, handleImageClick);
    cardsList.append(newCard);
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
    const newCard = createCard({name: placeNameInput.value, link: placeLinkInput.value},
        deleteCard, handleLike, handleImageClick);
    cardsList.prepend(newCard);
    newPlaceForm.reset();
    closeModal(newCardModal);
})