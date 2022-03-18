import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { receipt, person, home } from "ionicons/icons";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import { Profile } from "./pages/Profile";
import { AddTask } from "./pages/AddTask";
import { DetailedTask } from "./pages/DetailedTask";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

setupIonicReact();

const PrivateRoutes = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/tasks">
        <Tasks />
      </Route>
      <Route path="/task/:id">
        <DetailedTask />
      </Route>
      <Route exact path="/addTask">
        <AddTask />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Hjem</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tasks" href="/tasks">
        <IonIcon icon={receipt} />
        <IonLabel>Dine tasks</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile">
        <IonIcon icon={person} />
        <IonLabel>Profil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

const PublicRoutes = () => (
  <IonRouterOutlet>
    <Route exact path="/signin">
      <SignIn />
    </Route>
    <Route exact path="/signup">
      <SignUp />
    </Route>
  </IonRouterOutlet>
);

export const App = () => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    localStorage.getItem("userIsAuthenticated")
  );
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is authenticated
        setUserIsAuthenticated(true);
        localStorage.setItem("userIsAuthenticated", true);
      } else {
        // User is signed out
        setUserIsAuthenticated(false);
        localStorage.removeItem("userIsAuthenticated", false);
      }
    });
  }, [auth]);

  return (
    <IonApp>
      <IonReactRouter>
        {userIsAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        <Route>
          {userIsAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/signin" />
          )}
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};
