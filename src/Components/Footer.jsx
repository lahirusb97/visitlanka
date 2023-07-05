import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold">Visit Lanka</h3>
            <p className="mt-4">Explore the beauty of Sri Lanka</p>
          </div>
          <div className="col-span-1">
            <h4 className="text-lg font-bold">Travel Locations</h4>
            <ul className="mt-4">
              <li>Colombo</li>
              <li>Galle</li>
              <li>Kandy</li>
              <li>...</li>
              {/* ... */}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-lg font-bold">Taxi Services</h4>
            <ul className="mt-4">
              <li> Taxis</li>
              <li> Cabs</li>
              <li> Cars</li>
              <li>...</li>

              {/* ... */}
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-lg font-bold">Hotels</h4>
            <ul className="mt-4">
              <li>Grand Hotel</li>
              <li>Ocean View Resort</li>
              <li>Mountain Lodge</li>
              <li>...</li>

              {/* ... */}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-8 flex justify-between text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} visitlanka.lk All rights reserved.
          </p>
          <p>Designed and developed by Tharindu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
