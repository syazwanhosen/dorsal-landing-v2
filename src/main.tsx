import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store"; // ✅ Import Redux Persist
import { PersistGate } from "redux-persist/integration/react"; 
import { ThemeProvider } from "@/components/theme-provider";
import AppRouter from "./Router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}> {/* ✅ Ensure persisted state is restored */}
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
