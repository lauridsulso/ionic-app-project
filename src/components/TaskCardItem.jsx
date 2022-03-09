import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from "@ionic/react";

export const TaskCardItem = ({ task }) => {
  return (
    <IonCard>
      <IonImg src={task.image} />
      <IonCardHeader>
        <IonCardTitle>
          <h4>{task.title}</h4>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{task.body}</IonCardContent>
    </IonCard>
  );
};
