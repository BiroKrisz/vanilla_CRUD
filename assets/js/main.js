import { form, userName, mailAddress, address, isAllValidInTable, isAllValidInForm } from './validate.js'
import { backDisplay } from './display.js'
import { setMessage } from './message.js'

const usersUrl = 'https://thoracic-citrine-camp.glitch.me/users/'
const table = document.querySelector('#userTable')
const tableBody = table.querySelector('tbody')

let editCount = 0;
let tableName, tableEmail, tableAddress
let nameInput, emailInput, addressInput
let newUser

// ----------------------------------------------------------
// <---------- Showing the table with all the users ---------->
// ----------------------------------------------------------

const refreshTableData = () => setTimeout(showTableData, 500)

export async function showTableData() {
    try {
        const response = await axios.get(usersUrl);
        const users = response.data;
        users.reverse()
        createTable(users)
    } catch (err) {
        setMessage('crud')
        alert(err);
    }
}

function createTable(array) {
    const users = array.map(
        (user) => `
            <tr>
                <td class="col col-1">${user.id}</td>
                <td class="col" id="name_${user.id}"> ${user.name}</td>
                <td class="col" id="email_${user.id}"> ${user.emailAddress}</td>
                <td class="col" id="address_${user.id}"> ${user.address}</td>
                <td class="col col-buttons"> 
                <button type="button" id="editButton_${user.id}" class="button-edit" 
                    onclick="startEditing(${user.id})">Edit</button> 
                <button type="button" id="deleteButton_${user.id}" class="button-delete" 
                    onclick="deleteUser(${user.id});">Delete</button> 
                <button type="button" id="cancelButton_${user.id}" class="button-cancel" 
                    onclick="back(${user.id});">Back</button>
                <button type="button" id="saveButton_${user.id}" class="button-save" 
                    onclick="updateUser(${user.id})">Save</i></button> 
                </td>
            </tr>`
    ).join('');
    tableBody.innerHTML = users
}

// ----------------------------------------------------------
// <---------- Adding a new user ---------->
// ----------------------------------------------------------

const createUser = (newUser) => {
    axios
        .post(usersUrl, newUser)
        .catch(err => {
            setMessage('crud')
            console.log(err)
        })
}

export function addUser(event) {
    event.preventDefault();

    const userData = {
        name: userName.value,
        emailAddress: mailAddress.value,
        address: address.value
    }

    if (isAllValidInForm()) {
        setMessage('added');
        createUser(userData)
        refreshTableData()
        form.reset()
    } else {
        setMessage('wrong')
    }
};

// ----------------------------------------------------------
// <---------- Updating a user ---------->
// ----------------------------------------------------------

const updateTable = (id) =>
    axios
    .put(`${usersUrl}${id}`, newUser)
    .then(editCount = 0)
    .then(setMessage('update'))
    .catch(err => {
        setMessage('crud')
        console.log(err)
})

export const updateUser = (id) => {
    nameInput = document.querySelector(`#name_${id}`).textContent
    emailInput = document.querySelector(`#email_${id}`).textContent
    addressInput = document.querySelector(`#address_${id}`).textContent

    newUser = {
        'id': `${id}`,
        'name': `${nameInput}`,
        'emailAddress': `${emailInput}`,
        'address': `${addressInput}`,
    }

    if (isAllValidInTable(nameInput, emailInput, addressInput)) {
        updateTable(id)
        refreshTableData()
    } else {
        setMessage('wrong')
    }
}

// ----------------------------------------------------------
// <---------- Deleting a user ---------->
// ----------------------------------------------------------

export const deleteUser = (id) => {
    axios
        .delete(`${usersUrl}${id}`)
        .then(setMessage('removed'))
        .catch(err => {
            setMessage('crud')
            console.log(err)
        });
    refreshTableData()
}

// ----------------------------------------------------------
// <---------- Entering the edit mode ---------->
// ----------------------------------------------------------

export const startEditing = (id) => {
    editCount += 1;
    if (editCount === 1) {
        document.querySelector(`#editButton_${id}`).style.display = 'none';
        document.querySelector(`#deleteButton_${id}`).style.display = 'none';
        document.querySelector(`#saveButton_${id}`).style.display = 'inline';
        document.querySelector(`#cancelButton_${id}`).style.display = 'inline';

        document.querySelector(`#name_${id}`).setAttribute("contentEditable", true);
        document.querySelector(`#email_${id}`).setAttribute("contentEditable", true);
        document.querySelector(`#address_${id}`).setAttribute("contentEditable", true);

        tableName = document.querySelector(`#name_${id}`).textContent;
        tableEmail = document.querySelector(`#email_${id}`).textContent;
        tableAddress = document.querySelector(`#address_${id}`).textContent;
    } else {
        editCount += 1;
        setMessage('edit');
    }
}

// ----------------------------------------------------------
// <---------- Exiting the edit mode ---------->
// ----------------------------------------------------------

export const back = (id) => {
    editCount = 0;
    backDisplay(id)
    document.querySelector(`#name_${id}`).innerText = tableName;
    document.querySelector(`#email_${id}`).innerText = tableEmail;
    document.querySelector(`#address_${id}`).innerText = tableAddress;
}
