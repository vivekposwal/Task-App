import "./App.css";
import "./bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyTasks from "./Screens/MyTasks/MyTasks";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import SingleTask from "./Screens/SingleTask/SingleTask";
import CreateTask from "./Screens/CreateTask/CreateTask";
import { useState } from "react";
const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={(s) => setSearch(s)} />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/createtask" component={CreateTask} />
        <Route path="/task/:id" component={SingleTask} />
        <Route path="/mytasks" component={() => <MyTasks search={search} />} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
