import { Component } from 'react';
import Container from 'components/Container';
import TodoList from 'components/TodoList';
import TodoEditor from 'components/TodoEditor';
import Filter from 'components/Filter';
import initialTodos from './todos.json';
import shortid from 'shortid';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    const todo = { id: shortid.generate(), text: text, completed: false };

    this.setState(({ todos }) => ({ todos: [todo, ...todos] }));
    console.log(this.state);
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todoId === todo.id) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todoId === todo.id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  deleteTodo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== todoId),
    }));
  };

  changeFilter = e => {
    console.log(e.currentTarget.value);
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normilizedFilter),
    );
  };

  calcCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  calcUnCompletedTodos = () => {
    const { todos } = this.state;
    return todos.filter(todo => !todo.completed).length;
  };

  render() {
    const { todos, filter } = this.state;
    const {
      addTodo,
      toggleCompleted,
      deleteTodo,
      changeFilter,
      getVisibleTodos,
      calcCompletedTodos,
      calcUnCompletedTodos,
    } = this;

    const totalTodos = todos.length;
    const completedTodos = calcCompletedTodos();
    const unCompletedTodos = calcUnCompletedTodos();
    const visibleTodos = getVisibleTodos();

    return (
      <Container>
        <h2>My Todo List</h2>
        <div>
          <p>Total todos: {totalTodos}</p>
          <p>Done todos: {completedTodos}</p>
          <p>Not done todos: {unCompletedTodos}</p>
        </div>
        <TodoEditor onSubmit={addTodo} />
        <Filter value={filter} onChangeFilter={changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={deleteTodo}
          onToggleCompleted={toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
