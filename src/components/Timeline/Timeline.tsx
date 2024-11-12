import { useState } from "react";

import { parseDate, generateTimeMarkers, assignLanes } from "../../utils";
import { useModal } from "../../contexts/ModalContext";
import { useEvents } from "../../contexts/EventsContext";

import { TimelineEvent } from "./TimelineEvent";
import styles from "./Timeline.module.scss";
import { OptionsMenu } from "../OptionsMenu/OptionsMenu";
import type { TimelineProps } from "./Timeline.types";

const renderOptionsItems = (
  event: ITimelineEvent,
  editEvent: (event: ITimelineEvent) => void,
  deleteEvent: (id: number) => void
) => [
  { label: "Edit", onClick: () => editEvent(event) },
  { label: "Delete", onClick: () => deleteEvent(event.id) },
];

export const Timeline = ({ events }: TimelineProps) => {
  const [zoom, setZoom] = useState<number>(1);
  const { editEvent } = useModal();
  const { updateEvent, deleteEvent } = useEvents();
  const timelineStart = parseDate(events[0].start);
  const timelineEnd = parseDate(
    events.reduce(
      (latest, event) =>
        parseDate(event.end) > parseDate(latest) ? event.end : latest,
      events[0].end
    )
  );

  const handleRename = (newName: string, event: ITimelineEvent) => {
    if (newName) {
      updateEvent({ ...event, name: newName });
      return;
    }
    deleteEvent(event.id);
  };

  const lanes = assignLanes(events);
  const markers = generateTimeMarkers(timelineStart, timelineEnd, zoom);

  const canZoomIn = zoom < 10;
  const canZoomOut = zoom > 0.5;
  const handleZoomIn = () => canZoomIn && setZoom(zoom + 0.5);
  const handleZoomOut = () => canZoomOut && setZoom(zoom - 0.5);

  return (
    <>
      <div className={styles.zoomControls}>
        <button onClick={handleZoomIn} disabled={!canZoomIn}>
          Zoom In +
        </button>
        <button onClick={handleZoomOut} disabled={!canZoomOut}>
          Zoom Out -
        </button>
      </div>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <div className={styles.timeMarkers}>
            {markers.map((marker, index) => (
              <div
                key={index}
                className={styles.timeMarker}
                style={{ left: `${marker.position}%` }}
              >
                {marker.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ))}
          </div>
          <div className={styles.lanes}>
            {lanes.map((lane, laneIndex) => (
              <div key={laneIndex} className={styles.lane}>
                {lane.events.map((event, eventIndex) => (
                  <OptionsMenu
                    key={`${eventIndex}-${event.id}`}
                    items={renderOptionsItems(
                      event,
                      editEvent,
                      deleteEvent
                    )}
                  >
                    <TimelineEvent
                      event={event}
                      timelineStart={timelineStart}
                      timelineEnd={timelineEnd}
                      zoom={zoom}
                      onRename={(_, name) => handleRename(name, event)}
                    />
                  </OptionsMenu>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.gridLines}>
            {markers.map((marker, index) => (
              <div
                key={index}
                className={styles.gridLine}
                style={{ left: `${marker.position}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

