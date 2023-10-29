import Modal from "react-modal";
import styles from "./style.module.scss";

//icone fechar
import { FiX } from "react-icons/fi";

import { OrderProps } from "@/pages/order";

interface ModalCancelProps {
  isOpen: boolean;
  onRequestClose: () => void;
  item: OrderProps[];
  handleCancel: (id: string) => void;
}

export function ModalCancel({
  isOpen,
  onRequestClose,
  item,
  handleCancel,
}: ModalCancelProps) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#f34748" />
      </button>
      <div className={styles.container}>
        <h2>Você tem certeza que quer cancelar o pedido?</h2>

        <button
          className={styles.button}
          onClick={() => handleCancel(item[0].id)}
        >
          Sim
        </button>
      </div>
    </Modal>
  );
}
