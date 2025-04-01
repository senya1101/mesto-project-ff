const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card,  deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt.target.closest('.card')));
    return cardElement;
}

export const deleteCard = (cardElement) => {
    cardElement.remove();
}


