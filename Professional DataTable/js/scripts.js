// VARIABLES AND CONSTANTS

const rowsClients = document.getElementById('rows-clients'),
      checkboxSelectAll = document.getElementById('select-all')

let currentPage = 0,
    pages = 0


// FUNCTIONS

// Gets all the clients from our JSON file, with AJAX

const getClientsData = () => {
    const xhttp = new XMLHttpRequest()

    xhttp.open('GET', 'http://www.json-generator.com/api/json/get/bZvyOuDMlK?indent=2')
    xhttp.send()

    xhttp.onreadystatechange = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            const data = JSON.parse(xhttp.responseText)

            rowsClients.innerHTML = ''

            for(let item of data) {
                switch(item.status) {
                    case 0:
                        item.status = 'Offline'
                        break;
                    case 1:
                        item.status = 'Away'
                        break;
                    case 2:
                        item.status = 'Active'
                        break;
                }

                rowsClients.innerHTML += `
                    <tr>
                        <td><input type="checkbox" name="select"></td>
                        <td><span class="status ${item.status.toLowerCase()}">${item.status}</span></td>
                        <td>${item.nombre}</td>
                        <td>${item.company}</td>
                        <td>${item.country}</td>
                        <td>${item.email}</td>
                    </tr>
                `
            }
        }
    }
}

const checkRowTable = e => {
    let rows = Array.from(rowsClients.querySelectorAll('tr'))

    for(let row of rows) {
        if(row === e.target.parentElement) {
            let checkbox = e.target.parentElement.querySelector('input')

            checkbox.checked = !checkbox.checked
        }
    }
}

const checkAllRowsTable = () => {
    let rows = Array.from(rowsClients.querySelectorAll('tr')),
        selectAll = false;

    selectAll = checkboxSelectAll.checked ? true : false

    for(let row of rows) {
        let checkbox = row.querySelector('input')

        checkbox.checked = selectAll ? true : false
    }
}


// EVENTS

addEventListener('DOMContentLoaded', getClientsData)

rowsClients.addEventListener('click', e => checkRowTable(e))

checkboxSelectAll.addEventListener('change', checkAllRowsTable)