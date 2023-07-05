import React from "react";
import aboutimg from "../../assets/aboutimg.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
export default function About() {
  const navigate = useNavigate();
  return (
    <div>
      <section class="bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <img src={aboutimg} className="mt-20" />

            <h2 class="text-3xl font-bold mb-4">About VisitLanka.lk</h2>
            <p class="text-gray-700 mb-8">
              Welcome to VisitLanka.lk, your ultimate destination for travel
              information and services in Sri Lanka. We aim to provide
              comprehensive and reliable resources to make your travel
              experience unforgettable.
            </p>
            <p class="text-gray-700 mb-8">
              Whether you're looking for the perfect travel location, reliable
              taxi services, or comfortable accommodations, VisitLanka.lk has
              got you covered. Our platform connects travelers with trusted
              hotel and taxi owners, ensuring a seamless and enjoyable journey.
            </p>
            <p class="text-gray-700 mb-8">
              At VisitLanka.lk, we understand the importance of personalized
              travel experiences. That's why we offer powerful search and
              filtering options, allowing you to tailor your travel choices to
              your specific needs and preferences.
            </p>
            <p class="text-gray-700 mb-8">Our website features:</p>

            <ul class="text-left text-gray-700 mb-8">
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 inline-block mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17 4a1 1 0 01.117 1.993L17 6H3a1 1 0 01-.117-1.993L3 4h14zm-2-3H5a2 2 0 00-1.995 1.85L3 2v14a2 2 0 001.85 1.995L5 18h10a2 2 0 001.995-1.85L17 16V2a2 2 0 00-1.85-1.995L15 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Comprehensive travel information and services
              </li>
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 inline-block mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M9 3a7 7 0 00-7 7c0 3.86 3.141 7 7 7s7-3.14 7-7a7 7 0 00-7-7zm0 12a5 5 0 100-10 5 5 0 000 10z"
                    clip-rule="evenodd"
                  />
                </svg>
                Easy-to-use search and filtering options
              </li>
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 inline-block mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M9 3a7 7 0 00-7 7c0 3.86 3.141 7 7 7s7-3.14 7-7a7 7 0 00-7-7zm0 12a5 5 0 100-10 5 5 0 000 10z"
                    clip-rule="evenodd"
                  />
                </svg>
                Verified and trusted hotel and taxi owners
              </li>
              <li class="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 inline-block mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M9 3a7 7 0 00-7 7c0 3.86 3.141 7 7 7s7-3.14 7-7a7 7 0 00-7-7zm0 12a5 5 0 100-10 5 5 0 000 10z"
                    clip-rule="evenodd"
                  />
                </svg>
                Personalized recommendations for your travel needs
              </li>
            </ul>

            <p class="text-gray-700 mb-8">
              Start your Sri Lankan adventure with VisitLanka.lk today and
              discover the wonders of this beautiful country. We're here to make
              your travel dreams come true!
            </p>

            <a
              onClick={() => {
                navigate("/");
              }}
              href="#"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
