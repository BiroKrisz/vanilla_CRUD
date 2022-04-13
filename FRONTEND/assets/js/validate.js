import { addUser } from './main.js'

export const form = document.querySelector('#createUser');
export let userName = form.elements.namedItem('name')
export let mailAddress = form.elements.namedItem('emailAddress')
export let address = form.elements.namedItem('address')

const nameRegex = /[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+( [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)+/
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const addressRegex = /\d+( [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)+/

// ----------------------------------------------------------
// <------ Realtime form validation ------>
// ----------------------------------------------------------

const addValidList = (target) => {
    target.classList.add('valid');
    target.classList.remove('invalid');
}

const removeValidList = (target) => {
    target.classList.add('invalid');
    target.classList.remove('valid');
}

const realtimeValidate = (event) => {
    let target = event.target;

    if (target.name == 'name') {
        if (nameRegex.test(target.value)) {
            addValidList(target);
        } else {
            removeValidList(target)
        }
    } else if (target.name == 'emailAddress') {
        if (emailRegex.test(target.value)) {
            addValidList(target);
        } else {
            removeValidList(target)
        }
    } else if (target.name == 'address') {
        if (addressRegex.test(target.value)) {
            addValidList(target)
        } else {
            removeValidList(target)
        }
    }
}

// ----------------------------------------------------------
// <------ Onsubmit validations ----->
// ----------------------------------------------------------

const isAllValidInForm = () => {
    if (nameRegex.test(userName.value) &&
        emailRegex.test(mailAddress.value) &&
        addressRegex.test(address.value)) {
        return true;
    } else {
        return false
    }
}

const isAllValidInTable = (name, mail, addr) => {
    if (nameRegex.test(name) &&
        emailRegex.test(mail) &&
        addressRegex.test(addr)) {
        return true;
    } else {
        return false
    }
}

// ----------------------------------------------------------
// <------ Adding event listeners ----->
// ----------------------------------------------------------

form.addEventListener('submit', addUser)
userName.addEventListener('input', realtimeValidate)
mailAddress.addEventListener('input', realtimeValidate)
address.addEventListener('input', realtimeValidate)

export {
    isAllValidInTable,
    realtimeValidate,
    isAllValidInForm
}