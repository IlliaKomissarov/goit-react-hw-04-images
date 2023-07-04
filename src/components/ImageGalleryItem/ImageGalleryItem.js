import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

import Modal from 'components/Modal/Modal';
import { Controls } from 'components/Controls/Controls';

function ImageGalleryItem({ image, index, images }) {
  const [shownModal, setShownModal] = useState(false);
  const [indexSt, setIndex] = useState(index);

  const onModal = () => {
    setShownModal(prevState => !prevState);
  };

  const changeIndex = value => {
    setIndex(prevState => prevState + value);
  };

  const totalItems = images.length;
  const currentItem = images[indexSt];

  return (
    <li onClick={onModal} className={css.gallery_item}>
      <img
        className={css.gallery_item_img}
        src={image.webformatURL}
        alt={image.tags}
      />
      {shownModal && (
        <Modal onClose={onModal}>
          <img src={currentItem.largeImageURL} alt={currentItem.tags} />
          <Controls
            current={index + 1}
            total={totalItems}
            onChange={changeIndex}
          />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  image: PropTypes.object,
  index: PropTypes.number,
};

export default ImageGalleryItem;
