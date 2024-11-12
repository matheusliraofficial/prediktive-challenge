export interface TimelineProps {
  /**
   * Events in the timeline
   */
  events: ITimelineEvent[];
}

export interface TimelineEventProps {
  /**
   * Event to render
   */
  event: ITimelineEvent;

  /**
   * Start date of the timeline
   */
  timelineStart: Date;

  /**
   * End date of the timeline
   */
  timelineEnd: Date;

  /**
   * Zoom level of the timeline
   */
  zoom: number;

  /**
   * Callback to rename the event
   */
  onRename: (id: number, name: string) => void;
}