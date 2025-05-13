import "./Login.css";

import { useState } from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

   
    setFormData({
      ...formData,
      [name]: target.value,
    })
  };

  return (
    <div className="login">
      <form>
        <input
          type="text"
          name="username"
          placeholder="User name"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};
export default Login;
