import { Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";
import Dashboard from "./routes/Dashboard";
import ChatPage from "./routes/ChatPage";
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chats/:id" element={<ChatPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
