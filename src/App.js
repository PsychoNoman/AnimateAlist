import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Animediscovery from "./Animediscovery";
import Watchlist from "./Watchlist.js";
import { useColorMode, Switch } from "@chakra-ui/react";

function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <div className="app">
      <Switch padding={3} onChange={toggleColorMode} />
      <Router>
        <Routes>
          <Route path="/" element={<Animediscovery />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
