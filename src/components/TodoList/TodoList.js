import classNames from 'classnames';
import './TodoList.scss';
import Todo from 'components/Todo/Todo';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          onDeleteTodo={() => onDeleteTodo(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          id={id}
          text={text}
          completed={completed}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;
