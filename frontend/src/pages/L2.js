import React from "react";
import loading from "./Loading2.gif";
const Spinner = () => {
  return (
    <div style={{backgroundColor : "#D3D3D3"}}>
      <img src={loading} alt="" style={{position : "relative" , left : "43vw"}} />
    </div>
  );
};
export default Spinner;