import { CssBaseline } from "@mui/material";
import "./App.css";
import Router from "./routes/Router";
import Header from "./layouts/header/Header";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Router />
    </div>
  );
}

export default App;
