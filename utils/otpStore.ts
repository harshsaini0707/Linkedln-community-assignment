type OTPEntry = {
  otp: string;
  expires: number;
  userData: { name: string; email: string; password: string; biodata: string };
};

export const otpStore = new Map<string, OTPEntry>();
