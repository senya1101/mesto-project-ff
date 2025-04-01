import '../pages/index.css'
import { createCard, deleteCard} from "../components/card";
import {initialCards} from "./cards"
const cardsList = document.querySelector('.places__list');

initialCards.forEach((card)=>{
    const newCard = createCard(card, deleteCard);
    cardsList.append(newCard);
});

