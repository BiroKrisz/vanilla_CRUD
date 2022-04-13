
export const backDisplay = (id) => {
    document.querySelector(`#editButton_${id}`).style.display = 'inline';
    document.querySelector(`#deleteButton_${id}`).style.display = 'inline';
    document.querySelector(`#saveButton_${id}`).style.display = 'none';
    document.querySelector(`#cancelButton_${id}`).style.display = 'none';

    document.querySelector(`#name_${id}`).setAttribute("contentEditable", false);
    document.querySelector(`#email_${id}`).setAttribute("contentEditable", false);
    document.querySelector(`#address_${id}`).setAttribute("contentEditable", false);
}

