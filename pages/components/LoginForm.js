import React from "react";

const LoginForm = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form className="w-full md:w-1/3 bg-white rounded-lg">
        <h2 className="text-3xl text-center text-gray-700 mb-4">Login Form</h2>
        <div className="">
          <div className="w-full mb-2">
            <div className="flex items-center">
              <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                className="-mx-6 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="w-full mb-2">
          <div className="flex items-center">
            <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock"></i>
            <input
              type="text"
              placeholder="Password"
              className="-mx-6 px-8 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <a href="#" className="text-xs text-gray-500 float-right mb-4">
          Forgot Password?
        </a>
        <button
          type="submit"
          className="w-full rounded-full bg-green-600 text-gray-100  focus:outline-none"
        >
          Button
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
