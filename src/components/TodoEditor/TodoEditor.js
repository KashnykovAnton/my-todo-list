import { Component } from 'react';

import './TodoEditor.scss';

class TodoEditor extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      this.handleSubmit(e);
    }
  };

  handleChange = e => {
    this.setState({ message: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.message.trim()) {
      return alert("You don't add any information!");
    }
    this.props.onSubmit(this.state.message);
    this.reset();
  };

  reset = () => {
    this.setState({ message: '' });
  };

  render() {
    return (
      <form className="TodoEditor" onSubmit={this.handleSubmit}>
        <textarea
          className="TodoEditor__textarea"
          value={this.state.message}
          onChange={this.handleChange}
          placeholder="Add your todo here!"
        ></textarea>
        <button type="submit" className="TodoEditor__button">
          Add Todo
        </button>
      </form>
    );
  }
}

export default TodoEditor;
