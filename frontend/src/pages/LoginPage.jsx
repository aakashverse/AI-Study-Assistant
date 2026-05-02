import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import Input from "../components/Input";
import Button from "../components/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form).unwrap();
      navigate("/dashboard");
    } catch (err) {
      setError(err.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome back</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button type="submit" loading={isLoading}>Login</Button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}