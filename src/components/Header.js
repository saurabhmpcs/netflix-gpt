import React, { useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user.uid;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when component in unmount
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    //toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  justify-between ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="bg-gray-700 text-white p-2 m-2 rounded-lg"
              onClick={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.identifier}> {lang.name} </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="py-2 px-4 mx-4 my-2 bg-purple-600 text-white rounded-lg"
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          <img
            className="w-10 h-10 hidden md:block mt-2  rounded-full"
            src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
            alt="usericon"
          />
          <button
            onClick={handleSignOut}
            className=" text-white text-sm font-normal bg-gray-700 h-8  mt-3 rounded-lg px-2 ml-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
