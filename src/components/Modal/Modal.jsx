import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';
import { BsXLg } from 'react-icons/bs';

class Modal extends Component {
  static propTypes = {
    selectedImage: PropTypes.string,
    tags: PropTypes.string,
    onClose: PropTypes.func,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleESC);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleESC);
  }
  handleESC = e => {
    console.log('esc');
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { selectedImage, tags } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleClickBackdrop}>
        <div className={css.modal}>
          <BsXLg className={css.icon} />
          <img src={selectedImage} alt={tags} loading="lazy" />
        </div>
      </div>
    );
  }
}

export default Modal;
