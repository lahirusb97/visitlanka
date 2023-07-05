import React from "react";
import srilanka from "../../assets/Populer_place/srilanka.jpg";
export default function Aboutlk() {
  return (
    <div className="bg-slate-900">
      <div className="flex items-center flex-wrap justify-center py-8 text-white">
        <img className="max-w-screen-sm max-h-screen-sm" src={srilanka} />
        <div className="max-w-sm">
          <h1 className="text-center mt-4 text-2xl font-semibold text-white">
            About Srilanka
          </h1>
          <p className="text-center mt-8">
            Sri Lanka, formerly Ceylon, island country lying in the Indian Ocean
            and separated from peninsular India by the Palk Strait. It is
            located between latitudes 5°55′ and 9°51′ N and longitudes 79°41′
            and 81°53′ E and has a maximum length of 268 miles (432 km) and a
            maximum width of 139 miles (224 km).
          </p>
        </div>
      </div>
    </div>
  );
}
