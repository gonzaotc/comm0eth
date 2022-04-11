import Head from "next/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoginButton from "../components/LoginButton/LoginButton";
import SideModal from "../components/SideModal";
import useAutoLogin from "../hooks/useAutoLogin";
import { selectUser } from "../store/userSlice";
import { axiosApi } from "./api/axios";

export default function Home({ assetsData }) {
  const { loadingUser } = useAutoLogin();
  const [showSideModal, setShowSideModal] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className="h-full w-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center font-['Roboto'] relative">
      {showSideModal && <SideModal setShowSideModal={setShowSideModal} />}
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
      <div className="w-11/12 h-full flex flex-col items-center">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              onClick={() => setShowSideModal(true)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
          <LoginButton className="specialBtn w-full py-0.5 text-black font-medium text-base" />
        )}
        {/* LOGIN BUTTON */}

        {/* CONTENT CONTAINER */}
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
