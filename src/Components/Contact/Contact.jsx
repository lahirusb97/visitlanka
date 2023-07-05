import Footer from "../Footer";
import React, { useRef } from "react";

export default function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_isnq94q",
        "service_isnq94q",
        form.current,
        "R86tRQHXVVBv5Yvvo"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <section class="bg-gray-100 py-8">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
            <p class="text-gray-700 mb-8">
              We'd love to hear from you! If you have any questions,
              suggestions, or feedback, please feel free to get in touch with us
              using the contact form below.
            </p>

            <form ref={form} onSubmit={sendEmail} class="max-w-lg mx-auto">
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-4">
                <label
                  for="message"
                  class="block text-gray-700 text-sm font-bold mb-2"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div class="flex justify-center">
                <button
                  type="submit"
                  class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
