import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import Signin from "./containers/Signin/Signin";
import Signup from "./containers/Signup/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggegIn } from "./actions";
import Orders from "./containers/Orders/Orders";
import Products from "./containers/Products/Products";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLoggegIn());
  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path={"/"} exact component={Home} />
        <PrivateRoute path={"/products"} exact component={Products} />
        <PrivateRoute path={"/orders"} exact component={Orders} />

        <Route path={"/signin"} exact component={Signin} />
        <Route path={"/signup"} exact component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
