import { useEffect, useState, KeyboardEvent } from "react";

import styles from "./Timeline.module.scss";
import { getEventStyle } from "./Timeline.utils";
import { TimelineEventProps } from "./Timeline.types";

export const TimelineEvent = ({
  event,
  timelineStart,
  timelineEnd,
  zoom,
  onRename,
}: TimelineEventProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(event.name);

  useEffect(() => {
    setEditValue(event.name);
  }, [event.name]);

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onRename(event.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={styles.event}
      style={getEventStyle(event, timelineStart, timelineEnd, zoom)}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          className={styles.eventInput}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleSubmit}
          autoFocus
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <span className={styles.eventLabel}>{event.name}</span>
      )}
    </div>
  );
};
