"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center bg-[#181818] px-4">
      <div className="w-full max-w-sm bg-[#202020] border border-[#2d2d2d] p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <textarea
            name="biodata"
            placeholder="Tell us about yourself (optional)"
            rows={2}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400 transition ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>

          {msg && (
            <p className="text-sm text-red-400 text-center mt-2">{msg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
