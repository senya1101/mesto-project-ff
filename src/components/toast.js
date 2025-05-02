export function showToast(toast) {
    toast.classList.add("toast_is-animated");
    setTimeout(() => {
        toast.classList.replace("toast_is-animated", "toast_is-opened");
    }, 1);
    setTimeout(() => {
        closeToast(toast);
    }, 5000)
}

export function closeToast(toast) {
    toast.classList.replace('toast_is-opened', 'toast_is-animated');
}
