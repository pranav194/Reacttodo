import React from 'react';
import TodoItem from './Todoitem';
import PropTypes from 'prop-types';


class Todos extends React.Component {
   
    render(){
        return this.props.todos.map((todo)=>(
        <TodoItem delTodo = {this.props.delTodo} markComplete = {this.props.markComplete} key = {todo.id} todo = {todo}/>
        ));
    }
}

//PropTypes
Todos.propTypes = {
    todos : PropTypes.array.isRequired,
    markComplete :PropTypes.func.isRequired,
    delTodo :PropTypes.func.isRequired

}
export default Todos;
