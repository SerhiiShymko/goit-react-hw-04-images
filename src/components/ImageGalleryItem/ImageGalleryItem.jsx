import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ tags, smallImage, selectedImage }) {
  return (
    <li className={css.imageGalleryItem}>
      <img src={smallImage} alt={tags} onClick={selectedImage} />
    </li>
  );
}

ImageGalleryItem.prototype = {
  tags: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  selectedImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
