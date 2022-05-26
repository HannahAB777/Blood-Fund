import React from "react";
import PublicNav from "../Components/PublicNav";
import Footer from "../Components/Footer";
import video from '../video/bloodcells.mp4';
import css from "./PublicLayout.css";

export default function PublicLayout(props) {
  return (
    <div>
      <PublicNav></PublicNav>
      <div id="page-container">
        <div id="content-wrap">
        <video autoPlay muted loop id="myVideo">
  <source src={video} type="video/mp4"/>
</video>
        {props.children}</div>
      </div>

      <Footer id="footer"></Footer>
    </div>
  );
}
