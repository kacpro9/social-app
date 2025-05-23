import "./SignUp.css";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signUpMessage, setSignUpMessage] = useState("");

  const [signUpDone, setSignUpDone] = useState(false);

  const validate = () => {
    let validationErrors = {
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    if (formData.username.trim().length < 4) {
      validationErrors.username = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username must be at least 4 characters long",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.username.trim())) {
      validationErrors.username = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username can't have empty characters",
        };
      });
    } else {
      validationErrors.username = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "",
        };
      });
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      validationErrors.email = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "Email is not valid",
        };
      });
    } else {
      validationErrors.email = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "",
        };
      });
    }

    if (formData.password.trim().length < 6) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password must be at least 6 characters long",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.password.trim())) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password can't have empty characters",
        };
      });
    } else if (
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())
    ) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password:
            "Password should have one of these characters: !@#$%^&*()_+",
        };
      });
    } else {
      validationErrors.password = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "",
        };
      });
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          confirmPassword: "Password and Confirm Password should be the same",
        };
      });
    } else {
      validationErrors.confirmPassword = false;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          confirmPassword: "",
        };
      });
    }

    return (
      !validationErrors.username &&
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.confirmPassword
    );
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    axios
      .post("https://akademia108.pl/api/social-app/user/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        let resData = res.data;
        if (resData.signedup) {
          setSignUpMessage("Account created successfully");
          setSignUpDone(true);
        } else {
          if (resData.message.username) {
            setSignUpMessage(resData.message.username[0]);
          } else if (resData.message.email) {
            setSignUpMessage(resData.message.email[0]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signUp">
      {props.user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        {signUpMessage && <h2>{signUpMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="btn" disabled={signUpDone}>
          SignUp
        </button>
        {signUpDone && (
          <div>
            <Link to="/login" className="btn">
              Go to login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};
export default SignUp;
