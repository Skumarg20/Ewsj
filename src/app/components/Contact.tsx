'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import BookCallButton from "./BookaCall";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If you need to use templateParams, do so here.
    // Example: console.log(templateParams); or send it via email service

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="w-[90%] h-screen p-7 mt-5 mb-5 flex flex-col lg:flex-row rounded-3xl border shadow-lg m-auto">
      {/* Left Section */}
      <div className="w-full lg:w-[50%] mb-6 lg:mb-0 overflow-hidden">
        <h1 className="mt-4 font-bold pl-6 text-4xl">
          Start Your JEE/NEET Journey <br /> With Ewsj
        </h1>
        <p className="pl-6 mt-4 text-lg">
          We are here to help you succeed in your JEE/NEET preparations. Let’s build your future together.
        </p>

        <div className="mt-10 ml-5">
          <BookCallButton />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[50%]">
        <h2 className="text-2xl font-bold text-black mb-4 mt-3 ml-5 block">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="ml-3 flex flex-col items-center space-y-4"
        >
          {[
            {
              id: "name",
              type: "text",
              value: formData.name,
              placeholder: "Enter your name",
              label: "Name",
            },
            {
              id: "email",
              type: "email",
              value: formData.email,
              placeholder: "Enter your email",
              label: "Email",
            },
            {
              id: "subject",
              type: "text",
              value: formData.subject,
              placeholder: "Enter the subject",
              label: "Subject",
            },
            {
              id: "message",
              type: "textarea",
              value: formData.message,
              placeholder: "Type your message",
              label: "Message",
            },
          ].map(({ id, type, value, placeholder, label }) => (
            <div key={id} className="flex w-full lg:w-[80%] items-center">
              <label
                htmlFor={id}
                className="block w-[20%] text-sm font-medium text-black"
              >
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={id}
                  name={id}
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="flex-1 p-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:outline-none h-24 text-black"
                  required
                ></textarea>
              ) : (
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="flex-1 p-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:outline-none text-black"
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full lg:w-[80%] bg-black text-white py-2 px-4 rounded-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
