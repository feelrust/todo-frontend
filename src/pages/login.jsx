import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";
import { emailValidation } from "../helpers/validation";

export default function LoginPage() {
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validate(email, password) {
    let isValid = true;
    if (password < 5) {
      toast.error("password must be at least 5 characters");
      isValid = false;
    }
    if (emailValidation(email) === false) {
      toast.error("invalid email");
      isValid = false;
    }

    return isValid;
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!validate(email, password)) {
      return;
    }
    dispatch(login({ email, password }));
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <form
        className="flex flex-col w-64 h-screen gap-3 justify-center items-center mx-auto"
        onSubmit={handleLoginSubmit}
      >
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
          Don&apos;t have an account yet?
          <Link to={"/register"} className={"underline text-black"}>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}
