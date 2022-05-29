import './Todo.scss';
import IconButton from 'components/IconButton';
import { ReactComponent as DelIcon } from '../../icons/delete.svg';

const Todo = ({ onDeleteTodo, onToggleCompleted, text, completed }) => (
  <>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="TodoList__text">{text}</p>
    <button type="button" className="TodoList__btn" onClick={onDeleteTodo}>
      Delete
    </button>
    <IconButton type="button" onClick={onDeleteTodo} aria-label="Delete todo">
      <DelIcon width="40px" heght="40px" fill="#fff" />
    </IconButton>
  </>
);

export default Todo;
