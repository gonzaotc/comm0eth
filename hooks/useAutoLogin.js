import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import db, { auth } from "../firebase";
import { userActions } from "../store/userSlice";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, async userAuth => {
      setLoadingUser(true);
      if (userAuth) {
        // REDUX LOGIN
        console.log("User is already logged:", userAuth);
        dispatch(
          userActions.login({
            uid: userAuth.uid,
            email: userAuth.email,
            photoURL: userAuth.photoURL,
          })
        );
        // GETTING USER ESTIMATES
        onSnapshot(collection(db, "users", userAuth.uid, "estimates"), snapshot => {
          let estimates = [];
            snapshot.docs.forEach(doc => {
            estimates.push({
              ...doc.data(),
                id: doc.id,
              createdAt: doc.data().createdAt.toDate()
            });
          });
           console.log(estimates);
          dispatch(userActions.updateEstimates(estimates));
          setTimeout(() => {
            setLoadingUser(false);
          }, 1);
        });
      } else {
        dispatch(userActions.logout());
        console.log("User is not logged.");
        setTimeout(() => {
          setLoadingUser(false);
        }, 1);
      }
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return { loadingUser };
};

export default useAutoLogin;
