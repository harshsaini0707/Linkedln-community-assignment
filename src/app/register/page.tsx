"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    biodata: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        form,
        { withCredentials: true }
      );
      setMsg(res.data.message);
      sessionStorage.setItem("email", form.email);
      router.push("/verify-otp");
    } catch (err: any) {
      setMsg(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            name="biodata"
            placeholder="Tell us about yourself (optional)"
            rows={2}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white text-black border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md bg-black text-white font-semibold hover:bg-gray-900 transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>

          {msg && (
            <p className="text-sm text-red-500 text-center mt-2">{msg}</p>
          )}
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-bold hover:underline  ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
