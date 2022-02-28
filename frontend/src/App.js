import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import defaultTheme from "./styles/default";
import GlobalStyles from "./styles/globals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TankListByUser from "./pages/TankListByUser";
import CreateTank from "./pages/CreateTank";
import UpdateTank from "./pages/UpdateTank";

const App = () => {
  // #393E46
  // #00ADB5
  // #EEEEEE
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-center" autoClose={5000} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/tanks/by/:userId" component={TankListByUser} />
          <Route path="/tanks/new" component={CreateTank} />
          <Route path="/tanks/update/:tankId" component={UpdateTank} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
