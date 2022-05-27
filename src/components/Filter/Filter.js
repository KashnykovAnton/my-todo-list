import './Filter.scss';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className="Filter">
      <label className="Filter__label">
        Filter your todos:
        <input
          className="Filter__Input"
          type="text"
          value={value}
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
};

export default Filter;
