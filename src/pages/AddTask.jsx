import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AddTaskForm } from "../components/AddTaskForm";
import { tasksRef } from "../firebase-config";
import { push, set } from "firebase/database";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { getAuth } from "firebase/auth";

export const AddTask = () => {
  const history = useHistory();
  const auth = getAuth();

  async function handleSubmit(newTask) {
    newTask.uid = auth.currentUser.uid; // default user id added
    const newTaskRef = push(tasksRef); // push new to get reference and new id/key
    const newTaskKey = newTaskRef.key; // key from reference
    const imageUrl = await uploadImage(newTask.image, newTaskKey);
    newTask.image = imageUrl;
    set(newTaskRef, newTask)
      .then(() => {
        console.log("waiting");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    history.replace("/home");
  }

  async function uploadImage(imageFile, taskKey) {
    const newImageRef = ref(storage, `${taskKey}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opret din task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Opret din task</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AddTaskForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};
