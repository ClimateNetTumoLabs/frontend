import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import PositionProvider from "./context/PositionContext";
import Loading from './components/loading/Loading.jsx'

const App = lazy(() => import('./App.js'));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PositionProvider>
     <Suspense fallback={<Loading/>}>  {/* Fallback UI while loading */}
        <App />
     </Suspense>
    </PositionProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
