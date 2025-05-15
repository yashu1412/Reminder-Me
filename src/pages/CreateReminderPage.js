import React from "react";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import ReminderForm from "../components/ReminderForm"; 

const CreateReminderPage = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left Section with Reminder Image */}
      <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover object-top"
            src="https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Reminder Illustration"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
        <div className="relative">
          <div className="w-full max-w-xl mx-auto xl:w-full xl:max-w-xl xl:pr-24">
            <h3 className="text-white text-2xl font-semibold">
              Never miss an important task again. Set your reminders easily!
            </h3>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex items-center justify-center px-4 py-10 bg-white dark:bg-blue-950">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold leading-tight text-blue-900 dark:text-white sm:text-4xl">
            Add a Reminder
          </h2>

          {/* Back Button */}
          <p className="mt-2 text-base text-blue-700 dark:text-blue-300">
            <Link
              to="/"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline flex items-center gap-3"
            >
              <FaBackward />
              Back to Reminder List
            </Link>
          </p>

          {/* Reminder Form */}
          <div className="mt-6">
            <ReminderForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateReminderPage;
