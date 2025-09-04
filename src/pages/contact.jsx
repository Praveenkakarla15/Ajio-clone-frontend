import React from "react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4 text-lg">
        Have questions or feedback? We’d love to hear from you!  
        Reach out to us at:
      </p>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Email:</strong> support@ajio-clone.com</li>
        <li><strong>Phone:</strong> +91-9876543210</li>
        <li><strong>Address:</strong> Hyderabad, India</li>
      </ul>
    </div>
  );
}
