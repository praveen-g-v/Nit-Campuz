import React, { useEffect, useState } from "react";

import Header from "./HeaderComponent/Header";
import { useNavigate } from "react-router-dom";
import nitLogo from "../../assets/Logo/ngi logo.png";
import styles from "./Home.module.css";
import { IconMenu, IconLogout } from "../../assets/Icon/Icons";
import NavigationSideBar from "./NavigationSideBar";
import UserConfig from "../UserConfiguration/UserConfig";
import { pages } from "./PageRedirector";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function Home({ userBasicData, userLog, setUserLog }) {
  const navigate = useNavigate();
  //const handleClick = () => navigate('/');
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState("");
  const axiosPrivate = useAxiosPrivate();
  let r = async () => {
    try {
      const resp = await axiosPrivate.get("/login/haslogged");

      if (resp.status === 200) {
        setUserLog(resp.data);
      }
      console.log(resp);
    } catch (err) {
      console.log(err);
      navigate("/");

      // navigate("/");
    }
  };
  useEffect(() => {
    r();
  }, [userBasicData]);

  return (
    <>
      <Header userLog={userLog} setUserLog={setUserLog} />

      <Outlet />
      <hr class="hr" className="mb-5 mt-5" />
      <Footer />
    </>
  );
}

export default Home;
