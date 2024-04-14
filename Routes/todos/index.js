import express from 'express';
import { addTodo,
    getTodos,
    getSpecificTodo,
    updateTodo,
    deleteTodo } from '../../Controllers/todos.js';
const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.get('/:id', getSpecificTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo);


export default router;
