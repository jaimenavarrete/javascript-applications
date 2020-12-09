// VARIABLES AND CONSTANTS

const searchItem = document.getElementById('search-item'),
      searchBar = document.getElementById('search-bar'),
      checkboxSelectAll = document.getElementById('select-all'),
      rowsClients = document.getElementById('rows-clients')

let clientsData = [],
    searchedClientsData = [],
    currentPage = 1,
    pages = 1


// FUNCTIONS

// Gets all the clients from our API in JSON format, with AJAX

const getClientsData = () => {
    return new Promise(resolve => {
        const xhttp = new XMLHttpRequest()

        xhttp.open('GET', 'http://www.json-generator.com/api/json/get/bZvyOuDMlK?indent=2')
        xhttp.send()

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                const data = JSON.parse(xhttp.responseText)

                for(let item of data) {
                    switch(item.status) {
                        case 0: item.status = 'Offline'
                            break;
                        case 1: item.status = 'Away'
                            break;
                        case 2: item.status = 'Active'
                            break;
                    }
                }

                clientsData = data
                resolve(true)
            }
        }
    })
}

// Print all the data in the table

const printCompleteClientsData = () => {
    rowsClients.innerHTML = ''

    for(let item of clientsData) {
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

// Get the data that was searched in the text field

const getSearchedClientsData = () => {
    searchedClientsData = clientsData.filter(item =>
        item[searchItem.value].toLowerCase().includes(searchBar.value.toLowerCase())
    )
}

// Print the data that was searched in the text field

const printSearchedClientsData = () => {
    if(searchBar.value !== "") {
        getSearchedClientsData()

        rowsClients.innerHTML = ''

        for(let item of searchedClientsData) {
            switch(item.status) {
                case 0: item.status = 'Offline'
                    break;
                case 1: item.status = 'Away'
                    break;
                case 2: item.status = 'Active'
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
    else {
        printCompleteClientsData()
    }
}

// Checks o unchecks the client row where we do click

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
        selectAll = checkboxSelectAll.checked ? true : false;

    for(let row of rows) {
        let checkbox = row.querySelector('input')
        checkbox.checked = selectAll ? true : false
    }
}


// EVENTS

addEventListener('DOMContentLoaded', async () => {
    await getClientsData();
    printCompleteClientsData();
})

searchBar.addEventListener('keyup', printSearchedClientsData)

rowsClients.addEventListener('click', e => checkRowTable(e))

checkboxSelectAll.addEventListener('change', checkAllRowsTable)