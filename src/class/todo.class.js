export class Todo {

    static fromJSON({ id, todo, completed, createAt }) {

        const tempTodo = new Todo ( todo );

        tempTodo.id        = id;
        tempTodo.completed = completed;
        tempTodo.createAt  = createAt;

        return tempTodo;

    }

    constructor( todo ){

        this.id        = new Date ().getTime();
        this.todo      = todo;
        this.completed = false;
        this.createAt  = new Date();

    }

}