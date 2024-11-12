import { ToastContainer } from "react-toastify";

import { useModal } from "./contexts/ModalContext";
import { useEvents } from "./contexts/EventsContext";
import { CreateEventsButton } from "./components/CreateEventsButton";
import { EventsModal } from "./components/EventsModal";
import { Timeline } from "./components/Timeline";

import styles from "./app.module.scss";

export const Core = () => {
  const { events } = useEvents();
  const { isOpen } = useModal();

  return (
    <>
      <div className={styles.application}>
        <CreateEventsButton />
        <Timeline events={events} />
      </div>
      <EventsModal isOpen={isOpen} />
      <ToastContainer />
    </>
  );
};

