import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';
import { BsXLg } from 'react-icons/bs';

export default function Modal({ selectedImage, tags, onClose }) {
  useEffect(() => {
    const handleESC = e => {
      console.log('esc');
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleESC);
    return () => {
      document.removeEventListener('keydown', handleESC);
    };
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClickBackdrop}>
      <div className={css.modal}>
        <BsXLg className={css.icon} />
        <img src={selectedImage} alt={tags} loading="lazy" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
