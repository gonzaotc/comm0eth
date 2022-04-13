import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IconMenu, IconUser } from "../Assets/icons/icons";
import Asset from "../components/Asset/Asset";
import LoginButton from "../components/LoginButton/LoginButton";
import SideModal from "../components/SideModal";
import useAutoLogin from "../hooks/useAutoLogin";
import { selectUser } from "../store/userSlice";
import { axiosApi } from "./api/axios";

export default function Home({ assetsData }) {
  console.log(assetsData);

  const { loadingUser } = useAutoLogin();
  const [showSideModal, setShowSideModal] = useState(false);
  const user = useSelector(selectUser);

  return (
     <div className="spacer layer1">
      <div className="w-full bg-gradient-to-b from-black/25 via-black/50 to-black/25 flex items-center justify-center font-['Roboto'] relative">
        {showSideModal && (
          <SideModal
            className="relative"
            setShowSideModal={setShowSideModal}
            loadingUser={loadingUser}
          />
        )}
        <Head>
          <title>Comm0.eth</title>
          <meta name="description" content="Estimate crypto prices and win money" />
          <link rel="icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>

        {/* CONTENT CONTAINER */}
        <div className="w-11/12 lg:w-1/5 h-full flex flex-col items-center ">
          {/* NAVBAR */}
          <nav className="w-full mt-4 flex items-center justify-between mb-8">
            <img
              className="w-6 bg-transparent"
              src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
              alt=""
            />
            <span className="flex items-center justify-center">
              {!loadingUser && user && (
                <img className="w-8 rounded-full mr-4" src={user.photoURL} alt="" />
              )}
              <button onClick={() => setShowSideModal(true)}>
                <IconMenu />
              </button>
            </span>
          </nav>
          {/* NAVBAR */}

          {/* PRESENTATION */}
          <div className="w-full text-white mb-6">
            <h1 className="text-4xl font-medium mb-2">Predict crypto prices.</h1>
            <h2 className="text-xl text-yellow-500">Rank up and win money.</h2>
          </div>
          {/* PRESENTATION */}

          {/* LOGIN BUTTON  */}
          {!user && (
            <LoginButton className="specialBtn w-full py-0.5 mb-10 text-black font-medium text-base" />
          )}
          {/* LOGIN BUTTON */}

          {/* ASSETS CONTAINER */}
          <div className="w-full h-full flex items-center justify-center flex-col">
            {assetsData.map(assetData => {
              return <Asset assetData={assetData} />;
            })}
          </div>
          {/* ASSETS CONTAINER */}

          {/* CONTENT CONTAINER */}
        </div>
      </div>
    </div>
  );
}

// STATIC SITE GENERATION, NEVER GETS TO CLIENT.
export async function getStaticProps() {
  const PAGE_SIZE = 5;
  const response = await axiosApi.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${PAGE_SIZE}&page=${1}`
  );

  return {
    props: {
      assetsData: response.data,
    },
  };
}
