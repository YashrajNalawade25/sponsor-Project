import Landing from "./pages/landingPage/Landing"
import Events from "./pages/eventsPage/Events"
import Auth from "./pages/eventsPage/Auth";
import Admin from "./pages/adminPage/Admin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listing from "./pages/eventsPage/Listing";
import Shows from "./pages/eventsPage/Shows";
import Dashboard from "./pages/adminPage/Dashboard";
import Vendor from "./pages/adminPage/Vendor";
import Create from "./pages/adminPage/Create";
import EventDetails from "./pages/adminPage/EventDetails";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />}>
          <Route index element={<Listing />} />
          <Route path="auth" element={<Auth />} />
          <Route path="shows" element={<Shows />} />

        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="auth" element={<Auth />} />
          <Route path="create" element={<Create />} />
          <Route path="/admin/event/:eventId" element={<EventDetails />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
