"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedLoading, setFeedLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter()
  const fetchFeed = async () => {
    try {
      setFeedLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL!}/api/feed`, {
        withCredentials: true
      });
       
     // console.log(response?.data?.allPosts);
      
      if(response.status === 401){
        router.push("/login")
      }else if(response.status === 500){
        setError(response?.data?.message)
      }
      setPosts(response?.data?.allPosts)
    } catch (err) {
      setError('Error loading feed');
      console.log('Feed error:', err);
    } finally {
      setFeedLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL!}/api/createPost`,{
       content: newPost
      },{withCredentials: true})

      if(response?.status ===  401){
        router.push("/login")
      }

      fetchFeed();
     
    } catch (err) {
      setError('Error creating post');
      console.log('Post error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  //console.log(posts);
  

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="max-w-4xl mx-auto m-2 py-4 ">
        
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              Z
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening?"
                className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 bg-transparent"
            
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey)) {
                    handleCreatePost(e);
                  }
                }}
              />
              <div className="flex items-center justify-end pt-2 border-t border-gray-100">
  
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim() || loading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-full transition-colors duration-200"
                >
                  {loading ? 'Posting...' : 'Post'}
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
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
           
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 text-lg mb-2">No posts yet</div>
              <p className="text-gray-500">Be the first to share something!</p>
            </div>
          ) : (
            // Posts
            posts.map((post) => (
              <div key={post?._id } className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {post?.author?.name?.[0].toUpperCase() || 'X'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {post?.author?.name || 'Anonymous'}
                      </h3>
                      <span className="text-gray-400 text-sm">·</span>
                    <span className="text-xs text-gray-500">
  {new Date(post?.createdAt).getDate()}/
  {new Date(post?.createdAt).getMonth() + 1}/
  {new Date(post?.createdAt).getFullYear()}
</span>

                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed mb-4">
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
            className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-2 rounded-full border border-gray-200 transition-colors duration-200"
          >
            Refresh Feed
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default Dashboard;