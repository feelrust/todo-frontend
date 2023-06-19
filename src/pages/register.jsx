import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    if (password < 5) {
      toast("password must be at least 5 characters");
      return;
    }

    const resultAction = await dispatch(register({ email, password }));
    if (register.fulfilled.match(resultAction)) {
      toast.success("Registered successfully");
      navigate("/login");
    } else {
      toast.error("Register failed");
    }
  }

  return (
    <div>
      <form
        className="flex flex-col w-64 h-screen gap-3 justify-center items-center mx-auto"
        onSubmit={registerUser}
      >
        <h1 className="text-4xl text-center mb-4">Register</h1>
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
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
          Aleready a Member?{" "}
          <Link to={"/login"} className={"underline text-black"}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
