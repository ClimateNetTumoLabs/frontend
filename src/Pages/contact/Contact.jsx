import React from "react";
// import boxes from './tumobox.jpg'
import Custom  from "../../components/customicon/CustomSVG";
import Test from "../../components/test/Test";
import Tasks from "../../components/devices/Devices";
// import PressureCo2 from "../../components/test/PressureCo2";


function Contact() {
  console.log(Custom);
  return (
    <div>
      <Test />
      {/* <Custom /> */}
      {/* <PressureCo2 /> */}
      <Tasks/>
    </div>
  );
}

export default Contact;
