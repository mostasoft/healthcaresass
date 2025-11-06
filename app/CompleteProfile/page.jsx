"use client"
import Link from "next/link";
import React, { useState } from "react";

export default function CompleteProfile() {
  
   const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDomainSubmit = async () => {
    if (!username) return;

    setLoading(true);

    // Call API to create user
    const res = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // Redirect to the new subdomain
      window.location.href = `http://${username}.localhost:3000/`;
    } else {
      alert(data.error);
    }
  };








  const [profile, setProfile] = useState({
    subdomain: "",
    photo: null,
    emailVerified: false,
  });

  const [photoPreview, setPhotoPreview] = useState(null);


  function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoPreview(URL.createObjectURL(file));
    setProfile((prev) => ({ ...prev, photo: file }));
  }

  function handleUploadClick() {
    if (!profile.photo) {
      alert("Please select a file before uploading.");
      return;
    }
    console.log("Uploading photo:", profile.photo);
    alert("Photo uploaded successfully (demo only).");
  }

  function handleVerifyEmail() {
    setProfile((prev) => ({ ...prev, emailVerified: true }));
    alert("Verification link sent to your email (demo only).");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!profile.subdomain) {
      alert("Please provide your subdomain.");
      return;
    }
    console.log("Profile completed:", profile);
    alert("Profile completed successfully (demo only).");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium">Subdomain</span>
            <div className="mt-1 flex items-center">
             <input
        type="text"
        placeholder="Enter username"
        className="border p-2 w-full mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
              <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-200 rounded-r-xl text-gray-500">
                .mostasoft.com
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Choose a unique subdomain for your telemedicine profile.</p>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Profile Photo / Logo</span>
            <div className="mt-2 flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400">No photo</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:hover:bg-gray-50"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium shadow hover:bg-indigo-700"
                >
                  Upload
                </button>
              </div>
            </div>
          </label>

          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <span className="text-sm font-medium">Email Verification</span>
              <p className="text-xs text-gray-400 mt-1">
                {profile.emailVerified ? "Your email is verified." : "Please verify your email address."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleVerifyEmail}
              disabled={profile.emailVerified}
              className={`px-4 py-2 rounded-xl text-sm font-medium shadow ${
                profile.emailVerified
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {profile.emailVerified ? "Verified" : "Verify"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow"
          >
            Complete Profile
          </button>
          <button
             className="bg-blue-600 text-white px-4 py-2 rounded"
             onClick={handleDomainSubmit}
             disabled={loading}
         >
           {loading ? 'Creating...' : 'Go to subdomain'}
           </button>
        </form>
      </div>
    </div>
  );
}
