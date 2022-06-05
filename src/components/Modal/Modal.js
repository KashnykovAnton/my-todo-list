import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import IconButton from 'components/IconButton';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    console.log('Modal -> componentDidMount');
    console.log(this.props);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal -> componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log(e.code);
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    // console.dir(e.target);
    // console.dir(e.currentTarget);
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__closeBtn">
          <IconButton
            type="button"
            onClick={() => {
              this.props.onClose();
            }}
            aria-label="Close modal"
          >
            <CloseIcon width="40px" height="40px" fill="#fff" />
          </IconButton>
        </div>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
