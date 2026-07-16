// app/settings/page.js
import InstagramLogin from "@/components/InstagramLogin";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="mb-6">Connect your social media accounts below:</p>

      {/* Render the component */}
      <InstagramLogin />
    </div>
  );
}
