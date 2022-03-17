import {
  IonButton,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera, create } from "ionicons/icons";

export const AddTaskForm = ({ task, handleSubmit }) => {
  //  -------- USESTATES for adding task data --------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setImage(task.image);
      setDate(task.date);
      setLocation(task.location);
      setPrice(task.price);
    }
  }, [task]);

  function submitTask(event) {
    event.preventDefault();
    const formData = {
      title: title,
      description: description,
      image: imageFile,
      date: date,
      location: location,
      price: price,
    };
    handleSubmit(formData);
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

  return (
    <form onSubmit={submitTask}>
      <IonItem>
        <IonLabel position="stacked">
          Skriv en overskrift til din opgave
        </IonLabel>
        <IonInput
          value={title}
          placeholder="Rengøring af 95m2 lejlighed"
          onIonChange={(e) => setTitle(e.target.value)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">
          Beskriv din opgave mere detaljeret
        </IonLabel>
        <IonInput
          value={description}
          placeholder="Gulvvask og afstøvning på 3. sal"
          onIonChange={(e) => setDescription(e.target.value)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Hvornår skal opgaven løses?</IonLabel>
        <IonInput
          type="date"
          value={date}
          placeholder="Type the date of your dog"
          onIonChange={(e) => setDate(e.target.value)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Hvorhenne skal opgaven løses?</IonLabel>
        <IonInput
          value={location}
          placeholder="Aarhus C"
          onIonChange={(e) => setLocation(e.target.value)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">
          Hvor meget betaler opgaven i DKK?
        </IonLabel>
        <IonInput
          type="number"
          value={price}
          placeholder="400 dkk"
          onIonChange={(e) => setPrice(e.target.value)}
        ></IonInput>
      </IonItem>

      <IonItem onClick={takePicture}>
        <IonLabel>Vælg billede</IonLabel>
        <IonButton>
          <IonIcon icon={camera} />
        </IonButton>
      </IonItem>
      {image && (
        <IonImg className="ion-padding" src={image} onClick={takePicture} />
      )}

      <div className="ion-padding">
        <IonButton type="submit" expand="block">
          <IonIcon slot="start" icon={create} />
          Opret opgave
        </IonButton>
      </div>
    </form>
  );
};
