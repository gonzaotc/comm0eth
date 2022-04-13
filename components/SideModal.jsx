import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { IconClose, IconLogout } from "../Assets/icons/icons";
import { auth } from "../firebase";
import { selectUser } from "../store/userSlice";

const SideModal = ({ setShowSideModal, loadingUser, }) => {
  const user = useSelector(selectUser);
  console.log(user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        setShowSideModal(false);
      })
      .catch(error => {
        alert(error.code, error.message);
        console.log(error);
      });
  };

  return (
    <div className="z-10 bg-black/90 text-white h-full w-3/4 top-0 right-0 absolute lg:w-1/6 lg:right-2/5">
      <div className="p-4 w-full h-full flex flex-col items-start ">
        <button className="mb-2 hover:text-yellow-500" onClick={() => setShowSideModal(false)}>
          <IconClose />
        </button>
        {!loadingUser && user && (
          <div className="mb-6 w-full flex flex-col items-start">
            <span className="mb-2 flex justify-center items-center">
              {user.photoURL ? (
                <img className="w-6 rounded-full mr-2" src={user.photoURL} alt="" />
              ) : (
                <IconUser />
              )}
              {user.email}
            </span>
            <span className="">You have made {user.estimates.length} estimates.</span>
            <span className="">Rank: 1</span>
            <span className="">Precision: 0%</span>
          </div>
        )}
        {/* <div className="w-full flex items-center justify-center flex-col">
          <button className="btn">Join Telegram</button>
          <button className="btn">Join Discord</button>
          <button className="btn">Follow us in Twitter</button>
        </div> */}
        {user && (
          <button
            onClick={handleLogout}
            className="absolute bottom-10 right-10 hover:text-yellow-500"
          >
            <IconLogout />
          </button>
        )}
      </div>
    </div>
  );
};

export default SideModal;
