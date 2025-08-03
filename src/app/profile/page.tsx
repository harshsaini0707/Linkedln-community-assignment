"use client";
import UseProfile from "../../hooks/useProfile";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const userData = UseProfile();

  const [name, setName] = useState("");
  const [biodata, setBiodata] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userData) {
      setName(userData?.name || "");
      setBiodata(userData?.biodata || "");
      setEmail(userData?.email || "");
    }
  }, [userData]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/editProfile`,
        { name, biodata },
        { withCredentials: true }
      );
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage("Error updating profile.");
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/userPost`, {
        withCredentials: true,
      });
      setPosts(res.data.userPost || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const getInitial = (text: string) => (text ? text[0].toUpperCase() : "");

  return (
    <div className="min-h-screen bg-white py-10 ">
    
      <div className="relative bg-gray-100 w-full max-w-5xl p-6 rounded-lg shadow-md border border-black mx-auto my-10">

       
        <div className="flex items-start gap-6 mb-6">
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {getInitial(name)}
          </div>
          <div>
            <div className="flex gap-10">
              <h2 className="text-2xl font-semibold mb-1">{name}</h2>
            <p className="text-gray-600 mt-1.5">{email}</p>
            
            </div>
            <p className="text-gray-800 text-sm">{biodata}</p>
            {userData?.createdAt && (
              <p className="text-xs text-gray-500 mt-2">
                Joined: {formatDate(userData.createdAt)}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Edit Name</label>
            <input
              value={name}
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Edit Biodata</label>
            <textarea
              placeholder={biodata}
              value={biodata}
              onChange={(e) => setBiodata(e.target.value)}
              rows={2}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {message && <p className="text-sm text-green-600 font-medium">{message}</p>}
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Save Changes
          </button>
          
        </div>
      </div>

     
      <div className="max-w-4xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts yet.</p>
            <p className="text-gray-500 text-sm mt-2">Start sharing your thoughts!</p>
          </div>
        ) : (
          posts.map((post: any) => (
            <div
              key={post._id}
              className="relative bg-gray-100 border border-black rounded-lg  p-6 mb-6 shadow-md hover:bg-gray-200 group transition-all"
            >
              {/* <div className="absolute bottom-0  left-0 h-[1px] w-0 bg-black rounded-full group-hover:w-full duration-500 transition-all" /> */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                 {userData?.name[0].charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{post.author?.name}</h3>
                  <span className="text-sm text-gray-600">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-gray-800">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
