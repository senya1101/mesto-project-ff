import {addLike, deleteCardPromise, removeLike} from "../scripts/api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, isLiked, deletePerm, callbacks) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.style.display = deletePerm ? 'block' : 'none';
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__like-count').textContent = card.likes.length
    cardElement.querySelector('.card__title').textContent = card.name;
    deleteButton.addEventListener('click', (evt) => callbacks.deleteCard(evt.target.closest('.card'), card._id));
    cardLikeButton.addEventListener('click', (evt) => callbacks.handleLike(evt, card._id))
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
    cardImage.addEventListener('click', callbacks.handleImageClick)
    return cardElement;
}


export const deleteCard = (cardElement, cardId) => {
    deleteCardPromise(cardId).then((res) => {
        if (res.ok)
            return res.json()
        else return Promise.reject(res.status);
    }).catch((err) => {
        console.log(err)
    }).then(() => cardElement.remove())
}

export function handleLike(evt, cardId) {
    if (evt.target.classList.contains('card__like-button')) {
        if (evt.target.classList.contains('card__like-button_is-active')) {
            removeLike(cardId).then((res) => {
                if (res.ok)
                    return res.json()
                else
                    return Promise.reject(res.status);
            }).catch((err) => {
                console.log(err)
            })
                .then(data => {
                    evt.target.parentElement.querySelector('.card__like-count').textContent = data.likes.length
                    evt.target.classList.toggle('card__like-button_is-active');
                })
        } else {
            addLike(cardId).then((res) => {
                if (res.ok)
                    return res.json()
                else
                    return Promise.reject(res.status);
            }).catch((err) => {
                console.log(err)
            })
                .then(data => {
                    evt.target.parentElement.querySelector('.card__like-count').textContent = data.likes.length
                    evt.target.classList.toggle('card__like-button_is-active');
                })
        }

    }
}
