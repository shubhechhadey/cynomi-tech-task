import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./index.css";
import SleepForm from "./components/SleepForm";
import SleepTable from "./components/SleepTable";

const App = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
  <h1 className="text-4xl font-bold mb-8">Sleep Tracker App</h1>
  <Router>
    <nav className="mb-8">
      <Link to="/form" className="mr-4 text-blue-500">Add Sleep Entry</Link>
      <Link to="/table" className="text-blue-500">View Sleep Data</Link>
    </nav>
    <Routes>
      <Route path="/form" element={<SleepForm />} />
      <Route path="/table" element={<SleepTable />} />
    </Routes>
  </Router>
</div>
);

export default App;