import './styles.css';
import { TodoList } from './class/index';
import { createTodoHTML } from './js/components';


export const todoList  = new TodoList();


todoList.todos.forEach( createTodoHTML );