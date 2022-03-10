import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

export const AddTaskForm = ({ task, handleSubmit }) => {
  //  -------- USESTATES for adding task data --------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

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
      image: image,
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
    const imageUrl = image.dataUrl;
    setImage(imageUrl);
  }

  return (
    <form onSubmit={submitTask}>
      <IonItem>
        <IonLabel position="stacked"> Hello is this is title</IonLabel>
        <IonInput
          value={title}
          placeholder="Type the title of your task"
          onIonChange={(e) => setTitle(e.target.value)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Hello is this is description</IonLabel>
        <IonInput
          value={description}
          placeholder="Type the description of your task"
          onIonChange={(e) => setDescription(e.target.value)}
        ></IonInput>
      </IonItem>

      {/* PLACE IMAGE HERE------------------------ */}

      <IonItem>
        <IonLabel position="stacked"> Hello is this is date dog</IonLabel>
        <IonInput
          type="date"
          value={date}
          placeholder="Type the date of your dog"
          onIonChange={(e) => setDate(e.target.value)}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Hello is this is location dog</IonLabel>
        <IonInput
          value={location}
          placeholder="Type the location of your dogedog"
          onIonChange={(e) => setLocation(e.target.value)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Hello is this is price</IonLabel>
        <IonInput
          value={price}
          placeholder="Type the price of your task"
          onIonChange={(e) => setPrice(e.target.value)}
        ></IonInput>
      </IonItem>
      <div className="ion-padding">
        <IonButton type="submit" expand="block">
          Create
        </IonButton>
      </div>
    </form>
  );
};
