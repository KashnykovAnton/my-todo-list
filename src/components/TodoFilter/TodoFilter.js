import './TodoFilter.scss';

const TodoFilter = ({ value, onChangeFilter }) => {
  // console.log(value);
  return (
    <div className="TodoFilter">
      <label className="TodoFilter__label">
        Filter your todos:
        <input
          className="TodoFilter__input"
          type="text"
          value={value}
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
};

export default TodoFilter;
