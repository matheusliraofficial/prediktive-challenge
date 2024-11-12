import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useEvents } from "../../contexts/EventsContext";
import { useModal } from "../../contexts/ModalContext";
import type { EventsModalProps } from "./EventsModal.types";
import styles from "./EventsModal.module.scss";

export const EventsModal = ({ isOpen }: EventsModalProps) => {
  const { content, closeModal } = useModal();
  const { events, addEvent, updateEvent } = useEvents();

  const [event, setEvent] = useState<ITimelineEvent>({
    id: 0,
    name: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    setEvent(content);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const verifyErrors = () => {
    let error = "";
    if (!event.name) {
      error = "Event name is required";
    }
    if (!event.start) {
      error = "Event start date is required";
    }
    if (!event.end) {
      error = "Event end date is required";
    }
    if (event.start && event.end && event.start > event.end) {
      error = "Event start date must be before end date";
    }
    return error;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const error = verifyErrors();
    e.preventDefault();

    if (error) {
      toast.error(error);
      return;
    }

    closeModal();

    if (event.id) {
      updateEvent(event);
      return;
    }

    const newEvent = { ...event, id: events.length + 1 };
    addEvent(newEvent);
  };

  const isEditing = event.id > 0;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalOverlay__backdrop}
        onClick={closeModal}
        data-testid="modal-backdrop"
      />
      <div className={styles.modalOverlay__content}>
        <div className={styles.modalOverlay__header}>
          <h2>{isEditing? "Edit Event" : "Create Event"}</h2>
          <button
            className={styles.modalOverlay__close}
            onClick={closeModal}
            data-testid="modal-close"
          >
            X
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form__group}>
            <label htmlFor="event-name">Event Name</label>
            <input
              id="event-name"
              className={styles.form__input}
              type="text"
              name="name"
              placeholder="Event Name"
              value={event.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.form__group}>
            <label htmlFor="event-start">Start Date</label>
            <input
              id="event-start"
              className={styles.form__input}
              type="date"
              name="start"
              placeholder="Event Date"
              onChange={handleChange}
              value={event.start}
            />
          </div>
          <div className={styles.form__group}>
            <label htmlFor="event-end">End Date</label>
            <input
              id="event-end"
              className={styles.form__input}
              type="date"
              name="end"
              placeholder="Event End Date"
              onChange={handleChange}
              value={event.end}
            />
          </div>
          <button className={styles.form__submit} type="submit">
            {isEditing ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

