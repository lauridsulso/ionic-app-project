import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { push, set } from "@firebase/database";
import { tasksRef } from "../firebase-config";
import { useHistory } from "react-router";
import { AddTaskForm } from "../components/AddTaskForm";

export const AddTask = () => {
  const history = useHistory();

  async function handleSubmit(newTask) {
    newTask.uid = "0"; // default untill authorization

    const newTaskRef = push(tasksRef);
    await set(newTaskRef, newTask);

    history.replace("/home");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New task</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AddTaskForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};
