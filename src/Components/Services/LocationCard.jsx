import React from "react";

export default function LocationCard({ data }) {
  return (
    <div>
      <div className="p-2 shadow-md w-80 h-96 m-4">
        <img className="w-72 h-72 object-cover m-auto" src={data["Img"]} />
        <h1 className="text-center font-semibold text-lg">{data["Name"]}</h1>
        <div className="text-center bg-yellow-200">
          <h3 className="font-semibold text-textgray">
            Province: {data["province"]}
          </h3>
          <h3 className="font-semibold text-textgray">
            District: {data["district"]}
          </h3>
        </div>
      </div>
    </div>
  );
}
