// import modules
// ===============================
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

// import reducers
// ===============================
import rootReducer from "./reducers/indexReducer";

// Creating store
// ===============================
const store = configureStore({
    // pass slices here
    reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </Provider>
);
