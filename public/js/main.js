// creates a variable and assigning it to select the trash can icons with a class of 'fa-trash'
const deleteBtn = document.querySelectorAll('.fa-trash')
// creates a variable and assigning it to select all span tags with a parent with a class of 'item'
const item = document.querySelectorAll('.item span')
// creates a variable and assinging it to select all span tags that have a class of completed that have a parent with a class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed')
// creates a for each loop from an array of deleteBtn (trash cans) and adds an event listener to each which will run deleteItem function when clicked
Array.from(deleteBtn).forEach(element => {
   element.addEventListener('click', deleteItem)
})
// creates a for each loop from an array of item and adds an event listener to each item which will run the markComplete function when clicked
Array.from(item).forEach(element => {
   element.addEventListener('click', markComplete)
})
// creates a for each loop from an array of itemCompleted objects and adds an event listener to each item which will run the markUnComplete function when clicked
Array.from(itemCompleted).forEach(element => {
   element.addEventListener('click', markUnComplete)
})

// declaring an asynchronous function
async function deleteItem() {
   // assigns variable to text inside the list item
   const itemText = this.parentNode.childNodes[1].innerText
   // open a try block to run some code
   try {
      // creates a response variable that waits on a fetch to get data from the result of deleteItem route
      const response = await fetch('deleteItem', {
         // request to delete the item from the database
         method: 'delete',
         // letting the database know that we are expecting JSON content type
         headers: { 'Content-Type': 'application/json' },
         // telling the server what the body content will be and stringifying (changing content to string) the content
         body: JSON.stringify({
            // setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            itemFromJS: itemText,
         }),
      })
      // declaring a variable to recieve a response from the server and converting it to JSON
      const data = await response.json()
      // log the response to the console.
      console.log(data)
      // reloads the current page to show that item has been deleted
      location.reload()
      // open a catch block to catch errors thrown
   } catch (err) {
      // logs the error to the console
      console.log(err)
   }
}

async function markComplete() {
   const itemText = this.parentNode.childNodes[1].innerText
   try {
      const response = await fetch('markComplete', {
         method: 'put',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            itemFromJS: itemText,
         }),
      })
      const data = await response.json()
      console.log(data)
      location.reload()
   } catch (err) {
      console.log(err)
   }
}

async function markUnComplete() {
   const itemText = this.parentNode.childNodes[1].innerText
   try {
      const response = await fetch('markUnComplete', {
         method: 'put',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            itemFromJS: itemText,
         }),
      })
      const data = await response.json()
      console.log(data)
      location.reload()
   } catch (err) {
      console.log(err)
   }
}
