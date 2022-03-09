import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { AddTaskForm } from "../components/AddTaskForm";

export const AddTask = () => {
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
        <AddTaskForm />
      </IonContent>
    </IonPage>
  );
};
