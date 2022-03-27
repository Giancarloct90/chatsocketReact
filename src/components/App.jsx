// LIBRARIES
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// COMPONENTS
import LoginChat from "./LoginChat";
import RoomChat from "./RoomChat";
import NotFound from "./NotFound";
const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <LoginChat />
          </Route>
          <Route exact path={"/roomChat"}>
            <RoomChat />
          </Route>
          <Route path={"*"}>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
