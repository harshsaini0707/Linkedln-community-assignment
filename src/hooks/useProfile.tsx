import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UseProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/profile`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setProfileData(response.data.data);
        } else {
         
          router.push("/login");
        }
      } catch (error: any) {
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);
  return profileData;
}

export default UseProfile