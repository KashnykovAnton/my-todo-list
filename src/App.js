import { Component } from 'react';
import shortid from 'shortid';
import Container from 'components/Container';
import TodoList from 'components/TodoList';
import TodoEditor from 'components/TodoEditor';
import TodoFilter from 'components/TodoFilter';
import IconButton from 'components/IconButton';
import Modal from 'components/Modal';
import { ReactComponent as AddIcon } from './icons/add.svg';
// import initialTodos from './todos.json';

class App extends Component {
  state = {
    // todos: initialTodos,
    todos: [],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState, shapshot) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }
    // ----------This method is much less binding addTodo and toggleModal. It's more independent solution----------

    // if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
    //   this.toggleModal();
    // }
  }

  addTodo = text => {
    const todo = { id: shortid.generate(), text: text, completed: false };
    this.setState(({ todos }) => ({ todos: [todo, ...todos] }));
    this.toggleModal();
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

    // This solution with conditional operator is shorter than the previous one
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

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
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

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={addTodo} />
          </Modal>
        )}

        <IconButton
          type="button"
          onClick={() => {
            this.toggleModal();
          }}
          aria-label="Add todo"
        >
          <AddIcon width="40px" height="40px" fill="#fff" />
        </IconButton>

        <TodoFilter value={filter} onChangeFilter={changeFilter} />
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
