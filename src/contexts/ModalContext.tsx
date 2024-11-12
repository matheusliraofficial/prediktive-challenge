import { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  content: ITimelineEvent;
  editEvent: (event: ITimelineEvent) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ITimelineEvent>({
    id: 0,
    name: "",
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const editEvent = (event: ITimelineEvent) => {
    setContent(event);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent({
      id: 0,
      name: "",
      start: new Date().toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, content, editEvent }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

