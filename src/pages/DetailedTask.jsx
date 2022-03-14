import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonPage,
  IonText,
} from "@ionic/react";
import { calendar, call, navigateCircle, pricetag } from "ionicons/icons";

import { useEffect, useState } from "react";
import { usersRef } from "../firebase-config";
import { get } from "@firebase/database";
import { onValue } from "@firebase/database";
import { tasksRef } from "../firebase-config";
import { useHistory, useParams } from "react-router";

export const DetailedTask = () => {
  const [task, setTask] = useState();
  const params = useParams();
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    async function getUsers() {
      const snapshot = await get(usersRef);
      const usersArray = [];
      snapshot.forEach((taskSnapshot) => {
        const id = taskSnapshot.key;
        const data = taskSnapshot.val();
        const user = {
          id,
          ...data,
        };
        usersArray.push(user);
      });

      return usersArray;
    }

    async function listenOnChange() {
      const users = await getUsers();
      onValue(tasksRef, async (snapshot) => {
        const tasksArray = [];
        snapshot.forEach((taskSnapshot) => {
          const id = taskSnapshot.key;
          const data = taskSnapshot.val();
          const task = {
            id,
            ...data,
            user: users.find((user) => user.id === data.uid),
          };
          tasksArray.push(task);
        });

        const _task = tasksArray.find((task) => task.id === params.id);
        setTask(_task);
      });
    }

    listenOnChange();
  }, [params.id]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonButton
            color="light"
            fill="solid"
            style={{ position: "absolute", margin: "8px" }}
            onClick={goBack}
          >
            Back
          </IonButton>
          <IonImg src={task?.image} />
        </IonHeader>
        <IonItem lines="full">
          <IonAvatar slot="start">
            <IonImg src={task?.user.image} />
          </IonAvatar>
          <IonText>{task?.user.name}</IonText>
          <IonBadge color="primary" slot="end" style={{ display: "flex" }}>
            <IonIcon icon={call} style={{ paddingRight: "4px" }} />
            <IonText>{task?.user.phone}</IonText>
          </IonBadge>
        </IonItem>
        <IonItem lines="none">
          <IonText color="primary">
            <h1>{task?.title}</h1>
          </IonText>
        </IonItem>
        <IonItem lines="full">
          <IonText>
            <p>{task?.description}</p>
          </IonText>
        </IonItem>
        <IonItem lines="none">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IonText>
              <IonIcon icon={pricetag} />
              {task?.price} kr.
            </IonText>
            <IonText>
              <IonIcon icon={calendar} />
              {task?.date}
            </IonText>
            <IonText>
              <IonIcon icon={navigateCircle} />
              {task?.location}
            </IonText>
          </div>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
