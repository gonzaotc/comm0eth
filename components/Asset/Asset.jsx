import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import db from "../../firebase";
import { selectUser } from "../../store/userSlice";
import SpecialSlider from "../SpecialSlider/SpecialSlider";

// import "./Asset.scss";
const Asset = ({ assetData }) => {
  const user = useSelector(selectUser);

  const assetPrice = assetData.current_price.toFixed(2);
  const assetName = assetData.name;

  const [sliderValue, setSliderValue] = useState(0);
  let estimatePrice = (+assetPrice + (sliderValue / 100) * assetPrice).toFixed(2);
  let sliderValueColor =
    sliderValue < 0 ? "text-red-500" : sliderValue == 0 ? "text-white" : "text-green-500";

  const change24hs = assetData.price_change_percentage_24h;
  let change24hsColor =
    change24hs < 0 ? "text-red-500" : change24hs == 0 ? "text-white" : "text-green-500";

  const data = {
    asset: assetData.name,
    estimationPrice: estimatePrice,
    createdAt: serverTimestamp(),
  };

  const handleSubmitEstimate = async e => {
    e.preventDefault();
    const docRef = collection(db, "users", user.uid, "estimates");
    await addDoc(docRef, data);

    // TO BE REMOVED
    alert(
      `Thanks you trader!\nYour estimate: ${estimatePrice} (${
        sliderValue > 0 ? "+" : ""
      }${sliderValue}%)`
    );
    // TO BE REMOVED
  };

  return (
    <article className="w-full p-5 rounded-xl bg-gradient-to-tr from-neutral-800/25 via-neutral-400/25 to-neutral-800/25 mb-7 backdrop-blur-sm shadow-2xl z-0">
      <span className="flex items-center mb-4">
        <img className="w-6 h-6 mr-1.5" src={assetData.image} alt={`${assetData.name} icon`} />
        <h3 className="text-lg font-medium text-yellow-500 mr-2">{assetName}</h3>
        <span className={`text-[0.91rem] ${change24hsColor} relative top-[1px]`}>
          {`${change24hs > 0 ? "+" : ""}${change24hs.toFixed(2)}`}%
        </span>
      </span>

      <p className="text-white text-sm leading-4 mb-5">
        Some information about the asset, it could be the Weekly deadline or something.
      </p>
      <div className="flex items-center justify-around mb-1.5 text-lg">
        <span className="text-white">${assetPrice}</span>
        <span className={`w-4 ${sliderValueColor}`}>
          {`${sliderValue > 0 ? "+" : ""}${sliderValue}%`}
        </span>
        <span className={`${sliderValueColor}`}>${estimatePrice}</span>
      </div>
      <form onSubmit={handleSubmitEstimate} className="flex items-center justify-center flex-col">
        <SpecialSlider
          className="w-10/12 mb-7 accent-violet-700 active:cursor-pointer"
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />
        <button className="specialBtn py-2 mb-1.5 w-full font-medium text-[0.95rem] shadow-2xl" text="Estimate">
          Estimate
        </button>
      </form>
      {/* <form>
        <div className="inputs">
          <span className="inputSpan">
            <label htmlFor="min">min</label>
            <input id="min" name="max" type="number" />
          </span>

          <span className="inputSpan">
            <label htmlFor="max">max</label>
            <input id="max" name="max" type="number" />
          </span>
        </div>
      </form> */}
    </article>
  );
};

export default Asset;
