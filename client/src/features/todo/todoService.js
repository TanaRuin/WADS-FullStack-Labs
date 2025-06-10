import axios from 'axios'

const API_URL = '/service/todo'

// Get all todos
const getTodos = async () => {
    const response = await axios.get(API_URL + "/get_all")
    return response.data
}

// Create todo
const createTodo = async (todoData) => {
    const response = await axios.post(API_URL + "/create", todoData)
    return response.data
}

// Update todo
const updateTodo = async (id, todoData) => {
    const response = await axios.put(API_URL + `/update/${id}`, todoData)
    return response.data
}

// Delete todo
const deleteTodo = async (id) => {
    const response = await axios.delete(API_URL + `/delete/${id}`)
    return response.data
}

const todoService = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}

export default todoService 