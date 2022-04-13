export const setMessage = (messageText) => {
    const message = document.querySelector(`#message__${messageText}`)
    message.style.display = 'flex';
    setTimeout(() => {
        message.style.display = 'none'
    }, 5000)
}