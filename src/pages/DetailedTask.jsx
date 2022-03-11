import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useEffect, useState } from "react";
import { usersRef } from "../firebase-config";
import { get } from "@firebase/database";
import { onValue } from "@firebase/database";
import { tasksRef } from "../firebase-config";
import { useParams } from "react-router";
// import { TaskCardItem } from "../components/TaskCardItem";

export const DetailedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const params = useParams();

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
        const _task = tasksArray.find((task) => task.id === params.id);
        setTask(_task);
      });
    }

    listenOnChange();
  }, [params.id]);
  console.log(tasks);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detaljer om opgaven</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Er opgaven din?</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText>{task?.title}</IonText>
      </IonContent>
    </IonPage>
  );
};
