import { IonCard, IonText } from "@ionic/react";

import { getAuth } from "firebase/auth";

import { useEffect, useState } from "react";

export const UserTaskCard = ({ task }) => {
  const [user, setUser] = useState({});

  const auth = getAuth();
  console.log(task, "eibye");

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser, user]);

  function Task() {
    if (task.uid === user.uid) {
      return (
        <IonCard>
          <IonText>{task.title}</IonText>
        </IonCard>
      );
    } else {
      return <></>;
    }
  }
  return <Task />;
};
