/// <reference types="react-scripts" />

interface ITimelineEvent {
  /**
   * Unique identifier for the event
   */
  id: number;

  /**
   * Start date of the event
   */

  start: string;
  /**
   * End date of the event
   */
  end: string;

  /**
   * Name of the event
   */
  name: string;
}