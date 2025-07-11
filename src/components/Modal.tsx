import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from './styled/Modal.styled';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose} aria-label='Close'>
          &times;
        </ModalCloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
