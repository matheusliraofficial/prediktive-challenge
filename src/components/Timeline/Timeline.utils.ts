import { daysBetween, parseDate } from "../../utils";

export const getEventStyle = (
  event: ITimelineEvent,
  timelineStart: Date,
  timelineEnd: Date,
  zoom: number
) => {
  const start = parseDate(event.start);
  const end = parseDate(event.end);
  const totalDays = daysBetween(timelineStart, timelineEnd);

  const left = (daysBetween(timelineStart, start) / totalDays) * 100;
  const width = (daysBetween(start, end) / totalDays) * 100 * zoom;

  return {
    left: `${left * zoom}%`,
    width: `${width}%`,
    height: "30px",
    lineHeight: "30px",
  };
};
