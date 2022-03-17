import { getAuth } from "@firebase/auth";
import { remove } from "@firebase/database";
import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonToast,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { deleteObject, ref as sRef } from "firebase/storage";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import { getTaskRef, storage } from "../firebase-config";

export const UserTaskCard = ({ task }) => {
  const [presentActionSheet] = useIonActionSheet();
  const [presentDeleteDialog] = useIonAlert();
  const currentUserId = getAuth().currentUser.uid;

  function showActionSheet(event) {
    event.preventDefault();
    presentActionSheet({
      buttons: [
        { text: "Slet task", role: "destructive", handler: showDeleteDialog },
        { text: "Fortryd", role: "cancel" },
      ],
    });
  }

  function showDeleteDialog() {
    presentDeleteDialog({
      header: "Slet task",
      message: "Er du sikker på at du vil slette denne task?",
      buttons: [
        { text: "Nej" },
        { text: "Ja", role: "destructive", handler: deletePost },
      ],
    });
  }

  async function deletePost() {
    let imageName = task.image.split("/").pop();
    imageName = imageName.split("?alt")[0];
    const imageRef = sRef(storage, imageName);
    await deleteObject(imageRef);
    remove(getTaskRef(task.id));

    await IonToast.show({
      text: "Post deleted!",
      position: "center",
    });
  }

  return (
    <IonCard>
      {task.uid === currentUserId && (
        <IonButton fill="clear" onClick={showActionSheet}>
          <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline} />
        </IonButton>
      )}
      <IonImg src={task.image}></IonImg>
      <IonItem style={{ fontWeight: "bold" }} lines="full">
        {task.title}
      </IonItem>
      <IonItem lines="full">{task.description}</IonItem>
      <IonItem lines="full">{task.price} kr.</IonItem>
      <IonItem lines="none">{task.date}</IonItem>
    </IonCard>
  );
};
