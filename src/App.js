import React from 'react';
import Todos from './components/Todos';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
// import {v4 as uuid} from "uuid"; 
import About from './components/pages/About';
import axios from 'axios';

class App extends React.Component {
  state ={
    todos :[]
  }
 
  async componentDidMount(){
    const data = (await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")).data;
    // console.log(data);
    this.setState({todos : data});
  }
  delTodo = (id)=>{
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res=>{
      this.setState({todos: this.state.todos.filter(todo=>todo.id!==id)})
    })
    
  };
  
  //Toggle complete
  markComplete = (id)=>{
    this.setState({ todos : this.state.todos.map(todo => {
        if(todo.id=== id)
          todo.completed = !todo.completed
        return todo;
      })
    }) 
  }
  //AddTodo
addTodo=async (title)=>{
    let res = await axios.post('https://jsonplaceholder.typicode.com/todos',{
      title, completed :false
    })
    this.setState({todos :[...this.state.todos,res.data]})
  };
  
  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path = "/" render = {props=>(
              <React.Fragment>
                <AddTodo addTodo ={ this.addTodo}/>
                <Todos delTodo={this.delTodo} markComplete = {this.markComplete} todos ={this.state.todos}/>
              </React.Fragment>
              )}/>
            <Route path ="/about" component = {About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
