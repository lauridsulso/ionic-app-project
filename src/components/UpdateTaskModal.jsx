import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
} from "@ionic/react";
import { getTaskRef, storage } from "../firebase-config";
import { update } from "firebase/database";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { AddTaskForm } from "./AddTaskForm";

export const UpdateTaskModal = ({ task, dismiss }) => {
  async function updateTask(taskToUpdate) {
    if (taskToUpdate.image.dataUrl) {
      const imageUrl = await uploadImage(taskToUpdate.image, task.id);
      taskToUpdate.image = imageUrl;
    } else {
      delete taskToUpdate.image;
    }
    console.log(taskToUpdate);
    await update(getTaskRef(task.id), taskToUpdate);
    dismiss();
  }

  async function uploadImage(imageFile, taskKey) {
    const newImageRef = ref(storage, `${taskKey}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={() => dismiss()}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Edit Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <AddTaskForm task={task} handleSubmit={updateTask} />
    </IonContent>
  );
};
