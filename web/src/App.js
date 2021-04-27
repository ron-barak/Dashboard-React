import "./App.css";
import Navbar from "./components/navbar";
import Aside from "./components/aside";
import UsersTable from "./components/dashbord/usersTable";
import { Route, Switch } from "react-router";
import CreateUser from "./components/dashbord/createUser";
import EditUser from "./components/dashbord/editUser";
import SignIn from "./components/auth/signIn";
import { useState } from "react";
import { useEffect } from "react";
import userService from "./services/userService";
import Logout from "./components/auth/logout";
import SignUp from "./components/auth/signUp";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [state, setState] = useState({ user: "", userInfo: "" });

  useEffect(() => {
    const currentUser = async () => {
      const user = await userService.getCurrentUser();
      const userInfo = await userService.userInfo();
      setState({ user, userInfo });
    };
    currentUser();
  }, []);

  const { user, userInfo } = state;
  return (
    <div className="App">
      <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
      <div className="container-fluid">
        {user && (
          <header>
            <Navbar />
          </header>
        )}
        <div className="row">
          {user && (
            <aside className="col-lg-2">
              <Aside userInfo={userInfo} />
            </aside>
          )}
          <main className="col-lg-10">
            <Switch>
              <Route path="/home" component={UsersTable} />
              <Route path="/edit-user/:id" component={EditUser} />
              <Route path="/create-user" component={CreateUser} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={SignUp} />
              <Route path="/" component={SignIn} exact />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
