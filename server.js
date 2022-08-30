const express = require('express') // enables use of express
const app = express() // declaring variable for express
const MongoClient = require('mongodb').MongoClient // enables use of mongodb
const PORT = 2121 // admin port variable
require('dotenv').config() // password encryption

let db,
    dbConnectionStr = process.env.DB_STRING, // variable to store database connection might include login info
    dbName = 'todo' // database collection name

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) // connecting to mongoDB client
    .then((client) => {
        console.log(`Connected to ${dbName} Database`) // if connection successful console message
        db = client.db(dbName) // set db variable to the collection name from database
    })

app.set('view engine', 'ejs') // set view engine as ejs
app.use(express.static('public')) // makes everything in the public folder static
app.use(express.urlencoded({ extended: true })) // middleware url body parser
app.use(express.json()) // enables use of JSON data in express requests

app.get('/', async (request, response) => {
    // async funtion return promise
    //    const todoItems = await db.collection('todos').find().toArray() // sets variable to objects from db into an array
    //    const itemsLeft = await db.collection('todos').countDocuments({ completed: false }) // counts how many to do items are not completed yet
    //    response.render('index.ejs', { items: todoItems, left: itemsLeft }) // renders the items into html using ejs
    db.collection('todos')
        .find()
        .toArray() // if not for line above would require the following code
        .then((data) => {
            db.collection('todos')
                .countDocuments({ completed: false })
                .then((itemsLeft) => {
                    // pass the array into ejs template as items
                    response.render('index.ejs', {
                        items: data,
                        left: itemsLeft
                    })
                })
        })
        .catch((error) => console.error(error))
})

// process post request and responses with ejs
app.post('/addTodo', (request, response) => {
    db.collection('todos') // connects to todos database collection
        .insertOne({ thing: request.body.todoItem, completed: false }) // parses to do item from form and inserts into the database with a thing property and a completed property set to false
        .then((result) => {
            console.log('Todo Added') // if successful logs todo added
            response.redirect('/') // refreshes index.html (new item created will populate on todo list)
        })
        .catch((error) => console.error(error))
})

// Add a custom request handler to the `POST` method of the `/markComplete` path
app.put('/markComplete', (request, response) => {
    // Access the `todos` collection from the connected database,
    db.collection('todos')
        .updateOne(
            // running update one method
            { thing: request.body.itemFromJS }, // filter: search db for document with property of 'thing' set to the value of the request.body.itemFromJS property (from main.js file)
            {
                // update: updates the database object with completed property set to true
                $set: {
                    completed: true
                }
            },
            {
                // Attempt to sort the document _id's descending to get the latest document first - this works because the `_id` is a `ObjectId` and these contain the second they were created encoded within them.
                sort: { _id: -1 }, // sorts by _id property in descending order database
                upsert: false // if no todo item is found do not insert
            }
        )
        .then((result) => {
            console.log('Marked Complete') // logs marked complete
            response.json('Marked Complete') // responds with JSON string
        })
        .catch((error) => console.error(error))
})

app.put('/markUnComplete', (request, response) => {
    // process put/update request and responses with ejs
    db.collection('todos')
        .updateOne(
            { thing: request.body.itemFromJS },
            {
                // updates the database object with todo set to false
                $set: {
                    completed: false // sets completed property to false
                }
            },
            {
                sort: { _id: -1 }, // sorts by _id property in descending order database
                upsert: false // if no todo item is found do not insert
            }
        )
        .then((result) => {
            console.log('Marked Incomplete') // logs marked complete
            response.json('Marked Incomplete') // responds with JSON string
        })
        .catch((error) => console.error(error))
})

app.delete('/deleteItem', (request, response) => {
    // process delete request and responses with ejs
    db.collection('todos')
        .deleteOne({ thing: request.body.itemFromJS }) // deletes todo item from the database
        .then((result) => {
            console.log('Todo Deleted') // console logs todo deleted
            response.json('Todo Deleted') // responds with JSON todo deleted
        })
        .catch((error) => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
