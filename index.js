const express = require('express');
const cors = require('cors');
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());




const uuid = require('uuid')

const users = []


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const updatedUser = { id, name, age }
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(401).json({ message: "User not found" })
    }

    users[index] = updatedUser

    return response.json(updatedUser)
})


app.delete('/users/:id', (request, response) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(401).json({ message: "User not found" })
    }
    users.splice(index, 1)
    return response.status(204).json(users)
})


app.listen(port, () => {
    console.log(`server started on port ${port}`)
})