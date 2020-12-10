// VARIABLES AND CONSTANTS

const searchItem = document.getElementById('search-item'),
      searchBar = document.getElementById('search-bar'),
      checkboxSelectAll = document.getElementById('select-all'),
      rowsClientsContainer = document.getElementById('rows-clients'),
      entriesNumber = document.getElementById('entries-number')

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

// Print data element in the navigator's DOM

const printRegister = item => {
    rowsClientsContainer.innerHTML += `
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

// Print all the data in the table

const printCompleteClientsData = () => {
    

    rowsClientsContainer.innerHTML = ''

    for(let item of clientsData) {
        printRegister(item)
    }
}

// Get the data that was searched in the text field

const getSearchedClientsData = () => {
    searchedClientsData = clientsData.filter(item => {
        if(searchItem.value === 'anything') {

            return Object.values(item).reduce((exist, data) => {
                if(exist) return exist

                return data.toLowerCase().includes(searchBar.value.toLowerCase())
            }, false)
        }

        return item[searchItem.value].toLowerCase().includes(searchBar.value.toLowerCase())
    })
}

// Print the data that was searched in the text field, into the table

const printSearchedClientsData = () => {
    if(searchBar.value !== "") {
        getSearchedClientsData()

        rowsClientsContainer.innerHTML = ''

        for(let item of searchedClientsData) {
            printRegister(item)
        }
    }
    else {
        printCompleteClientsData()
    }
}

// Check or uncheck the client row where we do click

const checkRowTable = e => {
    const rows = Array.from(rowsClientsContainer.querySelectorAll('tr'))

    for(let row of rows) {
        const parent = e.target.parentElement

        if(row === parent) {
            const checkbox = parent.querySelector('input')

            checkbox.checked = !checkbox.checked

            return
        }
    }
}

const checkAllRowsTable = () => {
    const rows = Array.from(rowsClientsContainer.querySelectorAll('tr')),
        selectAll = checkboxSelectAll.checked ? true : false;

    for(let row of rows) {
        const checkbox = row.querySelector('input')

        checkbox.checked = selectAll ? true : false
    }
}


// EVENTS

addEventListener('DOMContentLoaded', async () => {
    await getClientsData();
    printCompleteClientsData();
})

searchBar.addEventListener('keyup', printSearchedClientsData)

rowsClientsContainer.addEventListener('click', e => checkRowTable(e))

checkboxSelectAll.addEventListener('change', checkAllRowsTable)