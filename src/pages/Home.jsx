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
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

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

  function goToAddTask() {
    history.replace("/addtask");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Alle tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IonButton onClick={goToAddTask} className="ion-padding">
            Opret en task
            <IonIcon slot="end" icon={add} />
          </IonButton>
        </div>
        <IonList>
          {tasks.map((task) => (
            <TaskCardItem task={task} key={task.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
