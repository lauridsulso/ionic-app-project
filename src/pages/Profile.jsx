import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonCardHeader,
} from "@ionic/react";

export const Profile = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonAvatar style={{ margin: "auto" }}>
          <img
            alt="Avatar"
            src="https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png"
          />
          {/* {user.image} */}
        </IonAvatar>
        <IonCardHeader>Navn Efternavn{/* {user.name} */}</IonCardHeader>
      </IonContent>
    </IonPage>
  );
};
