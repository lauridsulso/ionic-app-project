import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const SignIn = () => {
  const [hasError, setError] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = getAuth();

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log ind</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Log ind</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Mail</IonLabel>
            <IonInput
              value={mail}
              type="email"
              placeholder="Type your mail"
              onIonChange={(e) => setMail(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              value={password}
              type="password"
              placeholder="Type your password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              Log ind
            </IonButton>
          </div>
          {hasError && (
            <div className="ion-text-center">
              <IonText color="danger">Fejl i signin. Prøv igen ...</IonText>
            </div>
          )}
          <div className="ion-text-center">
            <IonButton
              size="small"
              fill="clear"
              onClick={() => history.replace("/signup")}
            >
              Har du endnu ikke en bruger?
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};
