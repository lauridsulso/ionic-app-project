import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { tasksRef, usersRef } from "../firebase-config";
import { onValue, get, orderByChild, query, equalTo } from "firebase/database";

import { UserTaskCard } from "../components/UserTaskCard";
import { getAuth } from "@firebase/auth";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUsers() {
      const snapshot = await get(usersRef);
      const usersArray = [];
      snapshot.forEach((taskSnapshot) => {
        const id = taskSnapshot.key;
        const data = taskSnapshot.val();
        const _user = {
          id,
          ...data,
        };
        usersArray.push(_user);
      });
      return usersArray;
    }

    async function listenOnChange() {
      const users = await getUsers();
      const data = query(tasksRef, orderByChild("uid"), equalTo(user.uid));

      onValue(data, async (snapshot) => {
        const tasksArray = [];
        snapshot.forEach((taskSnapshot) => {
          const id = taskSnapshot.key;
          const data = taskSnapshot.val();
          const task = {
            id,
            ...data,
            _user: users.find((_user) => _user.id === data.uid),
          };
          tasksArray.push(task);
        });
        setTasks(tasksArray.reverse());
      });
    }

    if (user?.uid) listenOnChange();
  }, [auth.currentUser, user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dine tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dine tasks</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {tasks.length > 0 ? (
            tasks.map((task) => <UserTaskCard task={task} key={task.id} />)
          ) : (
            <div>Works</div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
