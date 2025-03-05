const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function createCard(cardTitle, imageSrc, deleteCard = deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = imageSrc;
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
}

const deleteCard = (evt) => {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
}


initialCards.forEach((card)=>{
    const newCard = createCard(card.name, card.link, deleteCard);
    cardsList.append(newCard);
});
