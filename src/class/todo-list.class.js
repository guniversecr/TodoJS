import { Todo } from "./todo.class";


export class TodoList {

    constructor(){

        this.loadLocalStorage();

    }

    deleteComplete(){

        this.todos = this.todos.filter( todo => !todo.completed );
        this.saveLocalStore();

    }

    deleteTodo( id ){

        this.todos = this.todos.filter( todo => todo.id != id );
        this.saveLocalStore();

    }

    loadLocalStorage (){

        this.todos = ( localStorage.getItem( 'todo' ) )
                        ? JSON.parse( localStorage.getItem( 'todo' ) )
                        : [];

        this.todos = this.todos.map( Todo.fromJSON );

    }

    markCompleted ( id ){

        for( const todo of this.todos ){

            if( todo.id == id ){

                todo.completed = !todo.completed;
                this.saveLocalStore();
                break;
                
            }

        }

    }

    newTodo( todo ){

        this.todos.push( todo );
        this.saveLocalStore();

    }

    saveLocalStore (){
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

}