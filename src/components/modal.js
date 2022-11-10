import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import ReactDOM from "react-dom";

const CustomModal = ({ isOpen, onClose, children }) => {
  if (isOpen) {
    return (
      <>
        <Modal onClose={onClose} size={"lg"} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>{children}</ModalContent>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
};

export default CustomModal;
