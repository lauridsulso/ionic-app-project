import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonInput,
  IonIcon,
  IonImg,
  IonAvatar,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get, update } from "@firebase/database";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera, saveOutline } from "ionicons/icons";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Toast } from "@capacitor/toast";

export const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const fallBackImage =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setPhone(userData.phone);
        setImage(userData.image);
      }
    }

    if (user) getUserDataFromDB();
  }, [auth.currentUser, user]);

  function handleSignOut() {
    signOut(auth);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const userToUpdate = {
      name: name,
      phone: phone,
    };

    if (imageFile.dataUrl) {
      const imageUrl = await uploadImage();
      userToUpdate.image = imageUrl;
    }

    await Toast.show({
      text: "Profil opdateret!",
      position: "center",
    });

    await update(getUserRef(user.uid), userToUpdate);
  }

  async function takePicture() {
    const imageOptions = {
      quality: 80,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    setImageFile(image);
    setImage(image.dataUrl);
  }

  async function uploadImage() {
    const newImageRef = ref(storage, `${user.uid}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
          <IonButtons slot="primary">
            <IonButton onClick={handleSignOut} color="danger">
              Log ud
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAvatar
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <IonImg src={image ? image : fallBackImage} onClick={takePicture} />
        </IonAvatar>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <IonButton
            className="ion-padding"
            style={{ alignSelf: "center" }}
            onClick={takePicture}
            lines="none"
            fill="outline"
          >
            <IonLabel>Vælg profilbillede</IonLabel>
            <IonIcon slot="end" icon={camera} />
          </IonButton>
        </div>
        <IonItem style={{ marginTop: "50px" }}>
          <IonLabel position="stacked">Mail:</IonLabel>
          {user?.email}
        </IonItem>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Navn</IonLabel>
            <IonInput
              value={name}
              type="text"
              placeholder="Skriv dit navn"
              onIonChange={(e) => setName(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Telefonnummer</IonLabel>
            <IonInput
              value={phone}
              type="text"
              placeholder="Skriv dit telefonnummer"
              onIonChange={(e) => setPhone(e.target.value)}
            />
          </IonItem>

          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              <IonIcon slot="start" icon={saveOutline} />
              Gem ændringer
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};
