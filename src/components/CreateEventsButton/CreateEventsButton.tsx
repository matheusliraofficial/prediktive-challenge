import { useModal } from "../../contexts/ModalContext";
import styles from "./CreateEventsButton.module.scss";

export const CreateEventsButton = () => {
  const { openModal } = useModal();

  return (
    <button className={styles.createEventsButton} onClick={openModal}>
      Create Event
    </button>
  );
};

