import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Developer from "./scenes/developer";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Project from "./scenes/project";
import ViewProject from "./scenes/project/viewproject";
import ViewBug from "./scenes/project/viewbugs";
import Bug from "./scenes/bug";
import Login from "./scenes/login";
import Register from "./scenes/login/register";
import AssignProject from "./scenes/project/assignproject";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState("")

  useEffect(() => {
    let login = localStorage.getItem('isLogin');
    if(login=="true"){
      let rolee = localStorage.getItem('role');
      setRole(rolee);
      setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }

  }, [isLogin]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLogin == true && <Sidebar role={role} isSidebar={isSidebar} />}
          <main className="content">
            {isLogin == true && <Topbar role={role} setIsLogin={setIsLogin} setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/project" element={<Project />} />
              <Route path="/view-project" element={<ViewProject role={role} />} />
              <Route path="/view-bugs" element={<ViewBug role={role} />} />
              <Route path="/assign-project/:id" element={<AssignProject />} />
              <Route path="/developer" element={<Developer role={role} />} />
              <Route path="/bug" element={<Bug />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
