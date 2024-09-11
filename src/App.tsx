import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <div>
      <h1>APP</h1>{" "}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
