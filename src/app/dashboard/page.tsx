"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UseProfile from "@/hooks/useProfile";

type PostType =  {
  _id: string;
  content: string;
  createdAt: string;
  author?: { name?: string };
}

const Dashboard = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const userData = UseProfile();

  const fetchFeed = async () => {
    try {
      setFeedLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/feed`, {
        withCredentials: true,
      });

      if (response.status === 401) {
        router.push("/login");
      } else if (response.status === 500) {
        setError(response?.data?.message);
      }
      setPosts(response?.data?.allPosts);
    } catch (err) {
      setError("Error loading feed");
      console.log("Feed error:", err);
    } finally {
      setFeedLoading(false);
    }
  };

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/createPost`,
        { content: newPost },
        { withCredentials: true }
      );

      if (response?.status === 401) {
        router.push("/login");
      }

      setNewPost("");
      fetchFeed();
    } catch (err) {
      setError("Error creating post");
      console.log("Post error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  const avatarColors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-yellow-500',
  'bg-pink-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-teal-500',
];

const getRandomColor = () => {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
};


  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="max-w-4xl mx-auto px-4">

        <div className="bg-gray-100 rounded-xl border border-black p-5 mb-4 mt-8 shadow-sm relative overflow-hidden">
   
          <div className="flex space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {userData?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 bg-transparent"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    handleCreatePost(e);
                  }
                }}
              />
              <div className="flex justify-end pt-2 border-t border-gray-200">
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim() || loading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-full transition"
                >
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {feedLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl border border-black p-6 relative overflow-hidden"
                >
                 
                  <div className="animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-gray-100 rounded-xl border border-black p-12 text-center relative overflow-hidden">
              <p className="text-gray-600 text-lg">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post: PostType) => (
              <div
                key={post?._id}
                className="bg-gray-100 rounded-lg hover:bg-gray-200 border border-black p-4 hover:shadow-md transition-shadow relative overflow-hidden"
              >
             
                <div className="flex space-x-4">
                 <div
  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getRandomColor()}`}
>
  {post?.author?.name?.[0].toUpperCase() || 'X'}
</div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {post?.author?.name || "Anonymous"}
                      </h3>
                      <span className="text-gray-400 text-sm">·</span>
                      <span className="text-xs text-gray-500">
                        {new Date(post?.createdAt).getDate()}/
                        {new Date(post?.createdAt).getMonth() + 1}/
                        {new Date(post?.createdAt).getFullYear()}
                      </span>
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed">
                      {post?.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>


        <div className="mt-8 text-center">
          <button
            onClick={fetchFeed}
            className="bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-2 rounded-full border border-black transition"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
