import Landing from "./pages/landingPage/Landing"
import Events from "./pages/eventsPage/Events"
import Authusers from "./pages/eventsPage/Authusers";
import Admin from "./pages/adminPage/Admin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Listing from "./pages/eventsPage/Listing";
import Shows from "./pages/eventsPage/Shows";
import Dashboard from "./pages/adminPage/Dashboard";
import Vendor from "./pages/adminPage/Vendor";
import Create from "./pages/adminPage/Create";
import EventDetails from "./pages/adminPage/EventDetails";
import AuthAdmin from "./pages/adminPage/AuthAdmin";
import Drag from "./pages/adminPage/Drag";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />}>
          <Route index element={<Listing />} />
          <Route path="auth" element={<Authusers />} />
          <Route path="shows" element={<Shows />} />

        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/vendor/:eventId" element={<Vendor />} />
          <Route path="auth" element={<AuthAdmin />} />
          <Route path="create" element={<Create />} />
          <Route path="/admin/event/:eventId" element={<EventDetails />} />
          <Route path="/admin/drag/:eventId" element={<Drag />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
