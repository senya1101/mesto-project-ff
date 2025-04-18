const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card,  callbacks) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => callbacks.deleteCard(evt.target.closest('.card')));
    cardElement.querySelector('.card__like-button').addEventListener('click', callbacks.handleLike)
    cardImage.addEventListener('click', callbacks.handleImageClick)
    return cardElement;
}


export const deleteCard = (cardElement) => {
    cardElement.remove();
}

export function handleLike(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}
