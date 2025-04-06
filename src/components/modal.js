export function openModal(modal) {
    modal.classList.add('popup_is-opened');
}

export function closeModal(modal) {
    modal.classList.replace('popup_is-opened', 'popup_is-animated');

}