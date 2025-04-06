function overlayClickHandler(evt) {
    if (!evt.target.closest('.popup__content')){
        closeModal(evt.currentTarget);
    }
}

function escapeClickHandler(evt) {
    if (evt.key === 'Escape') {
        const activeModal = document.querySelector('.popup_is-opened');
        closeModal(activeModal);
    }
}

export function openModal(modal) {
    modal.classList.add("popup_is-animated");  // сначала анимация
    setTimeout(() => {
        modal.classList.add("popup_is-opened");  // потом только открытие
    }, 1);
    modal.addEventListener('click', overlayClickHandler);
    document.addEventListener('keydown',escapeClickHandler)
}

export function closeModal(modal) {
    modal.classList.replace('popup_is-opened', 'popup_is-animated');
    document.removeEventListener('keydown',escapeClickHandler)
    modal.removeEventListener('click', overlayClickHandler);
}
