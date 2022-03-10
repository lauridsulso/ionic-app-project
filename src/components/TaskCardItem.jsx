import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { locationOutline, pricetagOutline } from "ionicons/icons";

export const TaskCardItem = ({ task }) => {
  const history = useHistory();

  function goToDetailedTask() {
    history.push(`task/${task.id}`);
  }

  return (
    <IonCard onClick={goToDetailedTask}>
      <IonImg src={task.image} />
      <IonCardHeader>
        <IonCardTitle>
          <h4>{task.title}</h4>
        </IonCardTitle>
      </IonCardHeader>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IonCardContent style={{ display: "flex", alignItems: "center" }}>
          <IonIcon icon={pricetagOutline} style={{ paddingRight: "4px" }} />
          {task.price} DKK
        </IonCardContent>
        <IonCardContent style={{ display: "flex", alignItems: "center" }}>
          <IonIcon
            slot="icon-only"
            icon={locationOutline}
            style={{ paddingRight: "4px" }}
          />
          {task.location}
        </IonCardContent>
      </div>
    </IonCard>
  );
};
