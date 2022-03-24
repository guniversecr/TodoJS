// Imports 

    import { Todo } from '../class';
    import { todoList } from '../index.js';


// General Variables

    const divTodoList     = document.querySelector( '.todo-list' ),
          txtInput        = document.querySelector( '.new-todo' ),
          btndelete       = document.querySelector( '.clear-completed' ),
          ulFilters       = document.querySelector( '.filters' ),
          div             = document.createElement( 'div' ),
          anchorFilters   = document.querySelectorAll( '.filtro' );


// Functions

    const textValidator = ( text ) => {

        let res;

        console.log( text );

            res = /^\s*$/.test( text ) ? true : false;

        return res;

    };


// Events

    // Delete Completed

        btndelete.addEventListener( 'click', () => {

            todoList.deleteComplete();

            for ( let i = divTodoList.children.length - 1; i >= 0; i-- ){

                const element = divTodoList.children[ i ];

                if ( element.classList.contains( 'completed' ) ){
                    divTodoList.removeChild( element );
                }

            }

        })

    // Filters

        ulFilters.addEventListener( 'click', ( event ) => {

            const filter = event.target.text;

                if ( !filter ){ return; }

            anchorFilters.forEach( elem => elem.classList.remove( 'selected' ) );
            event.target.classList.add( 'selected' );

            for ( const element of divTodoList.children ){

                element.classList.remove( 'hidden' );
                const completed = element.classList.contains( 'completed' );

                switch( filter ){

                    case 'Pendientes':
                        if ( completed ){
                            element.classList.add( 'hidden' );
                        }
                    break;

                    case 'Completados':
                        if ( !completed ){
                            element.classList.add( 'hidden' );
                        }
                    break;

                }

            }

        })

    // Mark as Completed

        divTodoList.addEventListener( 'click', ( event ) => {

            const elementName = event.target.localName,
                  todoElement = event.target.parentElement.parentElement,
                  todoId      = todoElement.getAttribute( 'data-id' );

            if ( elementName.includes( 'input' ) ){

                todoList.markCompleted( todoId );
                todoElement.classList.toggle( 'completed' );

            }

            else if ( elementName.includes( 'button' ) ){

                todoList.deleteTodo( todoId );
                divTodoList.removeChild( todoElement );

            }

        })

    // Text insertion

        txtInput.addEventListener( 'keyup', ( event ) => {

            if ( event.keyCode === 13 && txtInput.value.length > 0 ){

                let result = textValidator( txtInput.value );

                if ( !result ) {

                    const newTodo = new Todo( txtInput.value  );
                    todoList.newTodo( newTodo );
                    createTodoHTML( newTodo );

                }

                txtInput.value = '';

            }

        })


// Creating element

    export const createTodoHTML = ( todo ) => {

        const htmlTodo = `
                <li class="${ ( todo.completed ) ? 'completed' : '' }" data-id="abc">
                    <div class="view">
                        <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked' : '' }>
                        <label>${ todo.todo }</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="Create a TodoMVC template">
                </li>`;

        div.innerHTML = htmlTodo;
        divTodoList.append( div.firstElementChild );

        return div.firstElementChild;

    }