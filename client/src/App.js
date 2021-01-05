import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Home, Login, Register, About, Contact, Error } from "./pages";
import { Navbar } from "./components";
import { useSelector } from "react-redux";

function App() {
  const history = useHistory();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const pathname = history.location.pathname;

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/register") {
      history.push("/login");
    } else if (
      isAuthenticated &&
      (pathname === "/login" || pathname === "/register")
    ) {
      history.push("/");
    }
  }, [isAuthenticated, history, pathname]);

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/register' exact component={Register}></Route>
        <Route path='*' component={Error}></Route>
      </Switch>
    );
  }

  return (
    <div className='container'>
      <Navbar className='mb-2' />
      <main>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/about' exact component={About}></Route>
          <Route path='/contact' exact component={Contact}></Route>
          <Route path='*' component={Error}></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
