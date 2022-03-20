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
import {
  calendar,
  call,
  location,
  pricetag,
  chevronBack,
} from "ionicons/icons";

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
  const avatarFallback =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

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
            style={{
              position: "absolute",
              marginTop: "24px",
              marginLeft: "24px",
            }}
            onClick={goBack}
          >
            <IonIcon icon={chevronBack} />
          </IonButton>
          <IonImg src={task?.image} />
        </IonHeader>
        <IonItem lines="full">
          <IonAvatar slot="start">
            <IonImg
              src={task?.user?.image ? task.user.image : avatarFallback}
            />
          </IonAvatar>
          <IonText>
            {task?.user?.name ? task.user.name : "Ukendt bruger"}
          </IonText>
          <IonBadge color="primary" slot="end" style={{ display: "flex" }}>
            <IonIcon icon={call} style={{ paddingRight: "4px" }} />
            <IonText>
              {task?.user?.phone ? task.user.phone : "Ikke verificeret"}
            </IonText>
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
              paddingTop: "20px",
            }}
          >
            <IonText>
              <IonIcon style={{ paddingRight: "12px" }} icon={pricetag} />
              {task?.price} kr.
            </IonText>
            <IonText style={{ paddingTop: "12px" }}>
              <IonIcon style={{ paddingRight: "8px" }} icon={calendar} />
              {task?.date}
            </IonText>
            <IonText style={{ paddingTop: "12px" }}>
              <IonIcon style={{ paddingRight: "8px" }} icon={location} />
              {task?.location}
            </IonText>
          </div>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
