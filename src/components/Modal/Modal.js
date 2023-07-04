import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');

function Modal({ onClose, children }) {
  useEffect(() => {
    function onEscapeClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', onEscapeClose);
    return () => window.removeEventListener('keydown', onEscapeClose);
  }, [onClose]);

  function onBackdropClose(e) {
    if (e.currentTarget !== e.target) {
      onClose();
    }
  }

  return createPortal(
    <div onClick={onBackdropClose} className={css.modal__backdrop}>
      <div className={css.modal__content}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
