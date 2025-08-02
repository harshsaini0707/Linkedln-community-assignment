"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedEmail =
      searchParams.get("email") ||
      (typeof window !== "undefined" ? sessionStorage.getItem("email") : "");

    if (!storedEmail) {
      router.push("/register");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
        { email, otp },
        { withCredentials: true }
      );

      setMsg("Verification successful!");
      sessionStorage.removeItem("email");
      router.push("/dashboard");
    } catch (err: any) {
      setMsg(err.response?.data || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181818] px-4">
      <div className="w-full max-w-sm bg-[#242424] border border-[#333] rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Verify OTP</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-md bg-[#2e2e2e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-md bg-green-500 text-black font-medium hover:bg-green-400 transition ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
          {msg && <p className="text-sm text-red-400 text-center">{msg}</p>}
        </form>
      </div>
    </div>
  );
}
