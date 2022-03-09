import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { tasksRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";
import { TaskCardItem } from "../components/TaskCardItem";

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

  return (
    <IonPage className="tasks-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {tasks.map((task) => (
            <TaskCardItem task={task} key={task.id} />
          ))}
        </IonList>
        <IonButton href="/addTask" color="success" expand="full">
          Add a task
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
