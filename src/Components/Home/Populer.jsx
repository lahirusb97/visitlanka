import React from "react";
import colombo from "../../assets/Hero/colombo.jpg";
import jaffna from "../../assets/Hero/jaffna.jpg";
import sigiriya from "../../assets/Hero/sigiriya.jpg";
export default function Populer() {
  return (
    <div className="bg-gray-900">
      <h1 className="text-center mt-4 text-2xl font-semibold text-white">
        Popular Places to Visit
      </h1>
      <div className="flex justify-center flex-wrap">
        <div className="w-96 shadow-md m-4 bg-white p-4">
          <img
            src={colombo}
            className="object-cover w-96 h-56 border-4 border-white"
          />
          <h1 className="text-center font-semibold text-gray-700 my-2">
            Colombo
          </h1>
          <div className="bg-gray-200 flex justify-between font-semibold text-textgray">
            <h2>181 Things to do</h2>
            <h2>25 Hotels</h2>
            <h2>25 Taxi services</h2>
          </div>
        </div>
        <div className="w-96 shadow-md m-4 p-4 bg-white">
          <img src={jaffna} className="object-cover w-96 h-56 " />
          <h1 className="text-center font-semibold text-gray-700 my-2">
            Jaffna
          </h1>
          <div className="bg-gray-200 flex justify-between font-semibold text-textgray">
            <h2>100 Things to do</h2>
            <h2>28 Hotels</h2>
            <h2>250 Taxi services</h2>
          </div>
        </div>
        <div className="w-96 shadow-darker m-4 p-4 bg-white">
          <img src={sigiriya} className="object-cover w-96 h-56 " />
          <h1 className="text-center font-semibold text-gray-700 my-2">
            Colombo
          </h1>
          <div className="bg-gray-200 flex justify-between font-semibold text-textgray">
            <h2>50 Things to do</h2>
            <h2>60 Hotels</h2>
            <h2>600 Taxi services</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
