import { render } from "react-dom";

import { EventsProvider } from "./contexts/EventsContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Core } from "./Core";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <EventsProvider>
    <ModalProvider>
      <Core />
    </ModalProvider>
  </EventsProvider>
);

render(<App />, document.getElementById("root"));
