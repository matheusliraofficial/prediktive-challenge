import { FC, createContext, useContext, useState, ReactNode } from "react";

import { timelineItems } from "../mocks/timelineItems";

interface EventsContextType {
  events: ITimelineEvent[];
  addEvent: (event: ITimelineEvent) => void;
  updateEvent: (event: ITimelineEvent) => void;
  deleteEvent: (id: number) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<ITimelineEvent[]>(timelineItems);

  const addEvent = (event: ITimelineEvent) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (updatedEvent: ITimelineEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id: number) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
