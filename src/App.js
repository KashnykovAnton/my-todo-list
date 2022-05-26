import { Component } from 'react';
import TodoList from 'components/TodoList';
import initialTodos from './todos.json';

class App extends Component {
  state = {
    todos: initialTodos,
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;
    const { deleteTodo } = this;

    const totalTodos = todos.length;
    const completedTodos = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0,
    );
    const unCompletedTodos = todos.filter(todo => !todo.completed).length;

    return (
      <>
        <h2>My Todo List</h2>
        <div>
          <p>Total todos: {totalTodos}</p>
          <p>Done todos: {completedTodos}</p>
          <p>Not done todos: {unCompletedTodos}</p>
        </div>
        <TodoList todos={todos} onDeleteTodo={deleteTodo} />
      </>
    );
  }
}

export default App;
