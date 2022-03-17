import { IonCard, IonImg, IonItem } from "@ionic/react";

export const UserTaskCard = ({ task }) => {
  return (
    <IonCard>
      <IonImg src={task.image}></IonImg>
      <IonItem>{task.title}</IonItem>
      <IonItem>{task.description}</IonItem>
      <IonItem>{task.price} kr.</IonItem>
      <IonItem>{task.date}</IonItem>
    </IonCard>
  );
};
