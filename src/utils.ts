export interface TimelineLane {
  /**
   * Events in the lane
   */
  events: ITimelineEvent[];

  /**
   * End date of the lane
   */
  end: Date;
}

export const parseDate = (dateStr: string) => new Date(dateStr)

export const daysBetween = (start: Date, end: Date) => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const assignLanes = (events: ITimelineEvent[]): TimelineLane[] => {
  const lanes: TimelineLane[] = [];

  events.forEach((event) => {
    const eventStart = parseDate(event.start);
    const eventEnd = parseDate(event.end);

    let laneIndex = lanes.findIndex((lane) => lane.end < eventStart);

    if (laneIndex === -1) {
      lanes.push({
        events: [event],
        end: eventEnd,
      });
    } else {
      lanes[laneIndex].events.push(event);
      lanes[laneIndex].end = eventEnd;
    }
  });

  return lanes;
};

export const generateTimeMarkers = (start: Date, end: Date, zoom: number) => {
  const markers = [];
  const totalDays = daysBetween(start, end);

  for (let i = 0; i <= totalDays; i += 7) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const position = (i / totalDays) * 100 * zoom;

    markers.push({
      date,
      position,
    });
  }

  return markers;
};
