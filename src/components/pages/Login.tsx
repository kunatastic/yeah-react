import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { login } from "../../util/ApiUtils";

function Login() {
  const [loginData, setLoginData] = useState({ username: "__kunal", password: "Welcome@123" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  async function handleLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = await login(loginData.username, loginData.password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className="text-5xl py-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-200 to-blue-900">
        Login
      </p>
      <form onSubmit={handleLoginForm}>
        <div className="mb-4">
          <label className={`font-semibold py-4`} htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            value={loginData.username}
            name="username"
            id="username"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className={`font-semibold py-4`} htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 border-gray-200"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            value={loginData.password}
            name="password"
            id="password"
            type="password"
          />
        </div>
        <button
          className="text-white w-full bg-blue-500 mx-2 px-4 text-center py-2 mt-4 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
