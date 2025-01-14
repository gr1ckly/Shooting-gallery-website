import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./components/App.tsx";
import {Provider} from "react-redux";
import store from "./storage/AppStorage.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
      <App/>
      </Provider>
  </StrictMode>,
);