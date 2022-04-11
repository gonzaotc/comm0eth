import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import db from "../../firebase";
import { selectUser } from "../../store/userSlice";

import SpecialButton from "../SpecialButton/SpecialButton";
import SpecialSlider from "../SpecialSlider.jsx/SpecialSlider";
import "./Asset.scss";
const Asset = ({ assetData }) => {
  const user = useSelector(selectUser);

  const assetPrice = assetData.current_price.toFixed(2);
  const assetName = assetData.name;

  const [sliderValue, setSliderValue] = useState(0);
  let estimatePrice = (+assetPrice + (sliderValue / 100) * assetPrice).toFixed(2);
  let sliderValueColor = sliderValue < 0 ? "red" : sliderValue == 0 ? "white" : "green";

  const change24hs = assetData.price_change_percentage_24h;
  let change24hsColor = change24hs < 0 ? "red" : change24hs == 0 ? "white" : "green";

  const data = {
    asset: assetData.name,
    estimationPrice: estimatePrice,
    createdAt: serverTimestamp(),
  };

  const handleSubmitEstimate = async e => {
    e.preventDefault();
    const docRef = collection(db, "users", user.uid, "estimates");
    await addDoc(docRef, data);

    alert(
      `Thanks you trader!\nYour estimate: ${estimatePrice} (${
        sliderValue > 0 ? "+" : ""
      }${sliderValue}%)`
    );
  };

  return (
    <article className="asset">
      <span className="assetTitleSpan">
        <img src={assetData.image} alt={`${assetData.name} icon`} />
        <h3>{assetName}</h3>
        <span className={`change24hs color--${change24hsColor}`}>
          {`${change24hs > 0 ? "+" : ""}${change24hs.toFixed(2)}`}%
        </span>
      </span>

      <p>Some information about the asset, it could be the Weekly deadline or something.</p>
      <div className="assetPrices">
        <span className="actualPrice">${assetPrice}</span>
        <span className={`sliderValue color--${sliderValueColor}`}>
          {`${sliderValue > 0 ? "+" : ""}${sliderValue}%`}
        </span>
        <span className={`estimatePrice color--${sliderValueColor}`}>${estimatePrice}</span>
      </div>
      <form onSubmit={handleSubmitEstimate}>
        <SpecialSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
        <SpecialButton text="Estimate" />
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
