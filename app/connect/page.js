"use client";

import Script from "next/script";

export default function InstagramLogin() {
  // 1. Initialize the SDK when the script has loaded
  const initFacebookSDK = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_META_APP_ID", // Replace with your actual App ID from the dashboard
        cookie: true,
        xfbml: true,
        version: "v19.0", // Use the current stable API version
      });
    };
  };

  // 2. Trigger the actual login popup
  const handleInstagramLogin = () => {
    if (!window.FB) return alert("Meta SDK not loaded yet!");

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log(
            "Success! Access token:",
            response.authResponse.accessToken,
          );
          // This is where you pass the token to your database or state
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      {
        // These permissions tell Meta you want access to the linked Instagram account
        scope: "instagram_basic,pages_show_list,pages_read_engagement",
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Load the official SDK script safely in Next.js */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={initFacebookSDK}
        crossOrigin="anonymous"
      />

      <button
        onClick={handleInstagramLogin}
        className="px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md font-semibold hover:opacity-90 transition-opacity"
      >
        Connect Instagram
      </button>
    </div>
  );
}
