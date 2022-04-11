import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";

const SideModal = ({ setShowSideModal, className }) => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <div className="bg-black/90 text-white h-full w-3/4 absolute top-0 right-0 flex items-center justify-center">
      <div className="p-4 w-full h-full flex flex-col items-start">
        <button className="mb-2" onClick={() => setShowSideModal(false)}>
          X
        </button>
        {user && (
          <div className="mb-6 w-full flex flex-col items-start">
            <span className="mb-2 flex justify-center items-center">
              <img className="w-6 rounded-full mr-2" src={user.photoURL} alt="" />
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
        <button className="absolute bottom-10 right-10">-></button>
      </div>
    </div>
  );
};

export default SideModal;
