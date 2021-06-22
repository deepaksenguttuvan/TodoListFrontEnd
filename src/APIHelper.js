import axios from "axios";

const API_URL="http://localhost:4200/todos/";

//Calling post api to create new task
async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task
  });
  return newTodo;
}

//Calling delete api 
async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

//Calling put api to update task completed status
async function updateTodo(id, payload) {
  const {data:newTodo} = await axios.put(`${API_URL}${id}`, payload);
  return newTodo;
}

//Calling get api to fetch all tasks
async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos };
