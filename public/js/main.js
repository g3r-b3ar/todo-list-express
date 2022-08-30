// creates a variable and assigning it to select the trash can icons with a class of 'fa-trash'
const deleteBtn = document.querySelectorAll('.fa-trash')
// creates a variable and assigning it to select all span tags with a parent with a class of 'item'
const item = document.querySelectorAll('.item span')
// creates a variable and assinging it to select all span tags that have a class of completed that have a parent with a class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed')
// creates a for each loop from an array of deleteBtn (trash cans) and adds an event listener to each which will run deleteItem function when clicked
Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})
// creates a for each loop from an array of (uncompleted) item and adds an event listener to each item which will run the markComplete function when clicked
Array.from(item).forEach((element) => {
    element.addEventListener('click', markComplete)
})
// creates a for each loop from an array of itemCompleted objects and adds an event listener to each item which will run the markUnComplete function when clicked
Array.from(itemCompleted).forEach((element) => {
    element.addEventListener('click', markUnComplete)
})

// declaring an asynchronous function
async function deleteItem() {
    // assigns variable to text inside the list item (had to change for this to work with comments)
    const itemText = this.parentNode.childNodes[1].nextElementSibling.innerText
    // open a try block to run some code
    try {
        // creates a response variable that waits on a fetch to get data from the result of deleteItem route
        const response = await fetch('deleteItem', {
            // request to delete the item from the database
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }, // letting the database know that we are expecting JSON content type
            body: JSON.stringify({
                // telling the server what the body content will be and stringifying (changing content to string) the content
                itemFromJS: itemText // setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            })
        })
        const data = await response.json() // declaring a variable to recieve a response from the server and converting it to JSON
        console.log(data) // log the response to the console.
        //   location.reload() // reloads the current page to show that item has been deleted
    } catch (err) {
        // open a catch block to catch errors thrown
        console.log(err) // logs the error to the console
    }
}
// declaring an asynchronous function
async function markComplete() {
    // looks inside of the list item and grabs only the inner text within the list to compare with objects in the database later
    const itemText = this.parentNode.childNodes[0].nextElementSibling.innerText
    // open a try block to run some code
    try {
        // creates a response variable that waits on a fetch to get data from the result of markComplete route
        const response = await fetch('markComplete', {
            method: 'put', // setting the CRUD method to "update" for the route
            headers: { 'Content-Type': 'application/json' }, // letting the database know that we are expecting JSON content type
            // telling the server what the body content will be and stringifying (changing content to string) the content
            body: JSON.stringify({
                itemFromJS: itemText // setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            })
        })
        const data = await response.json() // declaring a variable to recieve a response from the server and converting it to JSON
        console.log(data) // log the response to the console.
        location.reload() // reloads the current page to show that item has been deleted
        // open a catch block to catch errors thrown
    } catch (err) {
        console.log(err) // logs the error to the console
    } // close the catch block
} //end the function

//declare an async function
async function markUnComplete() {
    // looks inside of the list item and grabs only the inner text within the list
    const itemText = this.parentNode.childNodes[1].nextElementSibling.innerText
    // open a try block to run some code
    try {
        // creates a response variable that waits on a fetch to get data from the result of markUnComplete route
        const response = await fetch('markUnComplete', {
            method: 'put', // setting the CRUD method to "update" for the route
            headers: { 'Content-Type': 'application/json' }, // letting the database know that we are expecting JSON content type
            // telling the server what the body content will be and stringifying (changing content to string) the content
            body: JSON.stringify({
                itemFromJS: itemText // setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            })
        })
        const data = await response.json()
        console.log(data) // log the response to the console.
        location.reload() // reloads the current page to show that item has been deleted
        // open a catch block to catch errors thrown
    } catch (err) {
        console.log(err) // logs the error to the console
    } // close the catch block
} //end the function
