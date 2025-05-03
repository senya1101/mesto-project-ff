import {addLike, deleteCardPromise, removeLike} from "../scripts/api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, userId, callbacks) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const deletePerm = card.owner._id === userId
    const isLiked = card.likes.some(like => like._id === userId);
    deleteButton.style.display = deletePerm ? 'block' : 'none';
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__like-count').textContent = card.likes.length
    cardElement.querySelector('.card__title').textContent = card.name;
    if (deletePerm) deleteButton.addEventListener('click', (evt) => {
        callbacks.handleDelete(evt.target.closest('.card'), card._id)
    });
    cardLikeButton.addEventListener('click', (evt) => callbacks.handleLike(evt, card._id))
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardImage.addEventListener('click', callbacks.handleImageClick)
    return cardElement;
}


export const deleteCard = (cardElement, cardId) => {
   return deleteCardPromise(cardId).then(() => {
        cardElement.remove()
    })
}

export function handleLike(evt, cardId) {
    if (evt.target.classList.contains('card__like-button')) {
        if (evt.target.classList.contains('card__like-button_is-active')) {
            removeLike(cardId).then(data => {
                    evt.target.parentElement.querySelector('.card__like-count').textContent = data.likes.length
                    evt.target.classList.toggle('card__like-button_is-active');
                }).catch((err) => {
                console.log(err)
            })
        } else {
            addLike(cardId).then(data => {
                    evt.target.parentElement.querySelector('.card__like-count').textContent = data.likes.length
                    evt.target.classList.toggle('card__like-button_is-active');
                }).catch((err) => {
                console.log(err)
            })
        }

    }
}
