import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { tasksRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";
import { TaskCardItem } from "../components/TaskCardItem";
import { receiptOutline } from "ionicons/icons";

export const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const snapshot = await get(usersRef);
      const usersArray = [];
      snapshot.forEach((taskSnapshot) => {
        const id = taskSnapshot.key;
        const data = taskSnapshot.val();
        const user = {
          id,
          ...data,
        };
        usersArray.push(user);
      });
      return usersArray;
    }

    async function listenOnChange() {
      const users = await getUsers();
      onValue(tasksRef, async (snapshot) => {
        const tasksArray = [];
        snapshot.forEach((taskSnapshot) => {
          const id = taskSnapshot.key;
          const data = taskSnapshot.val();
          const task = {
            id,
            ...data,
            user: users.find((user) => user.id === data.uid),
          };
          tasksArray.push(task);
        });
        setTasks(tasksArray.reverse());
      });
    }

    listenOnChange();
  }, []);

  // function LoadOnce() {
  //   window.location.reload();
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Alle tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Alle tasks</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {tasks.map((task) => (
            <TaskCardItem task={task} key={task.id} />
          ))}
        </IonList>
        <div className="ion-padding">
          <IonButton
            style={{
              position: "fixed",
              bottom: "10px",
              right: "9px",
              left: "9px",
            }}
            href="/addTask"
            type="submit"
            expand="block"
            color="dark"
          >
            <IonIcon slot="start" icon={receiptOutline} />
            Tilføj task
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
