let myLeads = []
const inputEl = document.getElementById("input-el")//takes the input from the input form
const inputBtn = document.getElementById("input-btn")//with this the entered input will be saved.
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")//with this the data will be deleted.
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) //returns the data stored in localstorage.
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage//retuns only when the data is entered or the saved ,if the data is not stored it will retun empty.
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){//It is  query active will return the active tab data and the current tab data.
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {//returns the data from the array.
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {//with this we are manipalting the DOM . the html will read it and creates the li tags.
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'> 
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {//dblclick will return when the button is clicked twice.
    localStorage.clear()//it will clear the data stored in localstorage
    myLeads = []//it will return the empty array.
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)//adds the data in to the array
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})