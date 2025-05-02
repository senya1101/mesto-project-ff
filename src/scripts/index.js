import '../pages/index.css'
import {createCard, deleteCard, handleLike} from "../components/card";
import {openModal, closeModal} from '../components/modal'
import {enableValidation, clearValidation} from "./validation";
import {editProfile, getCards, getUser, newCard, updateAvatar} from "./api";
import {closeToast, showToast} from "../components/toast";

const cardsList = document.querySelector('.places__list');

const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const editProfileModal = document.querySelector('.popup_type_edit');
const editAvatarModal = document.querySelector('.popup_type_avatar');

const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

const editProfileForm = document.forms['edit-profile']
const profileName = document.querySelector('.profile__title')
const profileNameInput = editProfileForm.elements.name;
const profileDescription = document.querySelector('.profile__description');
const profileDescriptionInput = editProfileForm.elements.description;
const profileAvatar = document.querySelector('.profile__image');
const newPlaceForm = document.forms['new-place']

const editAvatarForm = document.forms['edit-avatar'];
const avatarInput = editAvatarForm.elements.picture;


const errorToast = document.querySelector('.toast_type_error');
const errorMessage = errorToast.querySelector('.toast__message');

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


function renderCard(item, isLiked, deletePerm, method = "prepend") {
    const cardElement = createCard(item, isLiked, deletePerm, {deleteCard, handleLike, handleImageClick});
    cardsList[method](cardElement);
}

function renderPage() {
    Promise.all([getUser(), getCards()]).then(responses => {
        if (responses.every(res => res.ok))
            return Promise.all(responses.map(res => res.json()))
        else {
            return Promise.reject(responses.filter(res => !res.ok)[0].status)
        }
    })
        .then(data => {
            closeToast(errorToast)
            const userData = data[0]
            const cards = data[1]
            profileName.innerText = userData.name;
            profileDescription.innerText = userData.about;
            profileAvatar.style.backgroundImage = 'url(' + userData.avatar + ')';
            cards.forEach((card) => {
                const isLiked = card.likes.some(like => like._id === userData._id)
                const deletePerm = userData._id === card.owner._id;
                renderCard(card, isLiked, deletePerm, "append");
            })
        }).catch(err => {
            errorMessage.innerText = err
            showToast(errorToast)
    })
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


profileAvatar.addEventListener('click', (evt) => {
    openModal(editAvatarModal)
    editAvatarForm.reset()
    closeModal(editAvatarForm, validationSettings)
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
    setLoading(true, editProfileForm);
    editProfile(profileNameInput.value, profileDescriptionInput.value).then(
        res => {
            if (res.ok)
                return res.json()
            else
                return Promise.reject(res.status)
        }
    ).then(data => {
        errorMessage.innerText = ''
        closeToast(errorToast)
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(editProfileModal);
    }).catch(err => {
        errorMessage.innerText = err
        showToast(errorToast)
    }).finally(() => {
        setLoading(false, editProfileForm);
    })
})

newPlaceForm.addEventListener('submit', evt => {
    evt.preventDefault();
    setLoading(true, newPlaceForm);
    const placeNameInput = newPlaceForm.elements['place-name']
    const placeLinkInput = newPlaceForm.elements.link
    newCard(placeNameInput.value, placeLinkInput.value).then(
        res => {
            if (res.ok)
                return res.json()
            else
                return Promise.reject(res.status)
        }
    ).then(data => {
        errorMessage.innerText = ''
        closeToast(errorToast)
        renderCard(data, false, true);
        newPlaceForm.reset();
        closeModal(newCardModal);
    }).catch(err => {
        errorMessage.innerText = err
        showToast(errorToast)
    }).finally(() => {
        setLoading(false, newPlaceForm);
    })

})


editAvatarForm.addEventListener('submit', evt => {
    evt.preventDefault();
    setLoading(true, editAvatarForm)
    updateAvatar(avatarInput.value).then(res => {
        if (res.ok)
            return res.json()
        else return Promise.reject(res.status)
    })
        .then(data => {
            errorMessage.innerText = ''
            closeToast(errorToast)
            profileAvatar.style.backgroundImage = 'url(' + data.avatar + ')';
            editAvatarForm.reset();
            closeModal(editAvatarModal);
        })
        .catch(err => {
            errorMessage.innerText = err
            showToast(errorToast)
        })
        .finally(() => {
            setLoading(false, editAvatarForm)
        })
})


function setLoading(state, form) {
    const buttonElement = form.querySelector('.popup__button');
    if (state) {
        buttonElement.innerText = "Сохранение..."
    } else {
        buttonElement.innerText = "Сохранить"
    }
}
