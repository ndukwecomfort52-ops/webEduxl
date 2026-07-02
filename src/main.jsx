import React, { StrictMode, Suspense } from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader.jsx";
import AppWrapperContainer from "./components/layout/index.jsx";
import { persistor, store } from "./redux/store.js";

import { AuthProvider } from "../contexts/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router>
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <App />
            </Suspense>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
