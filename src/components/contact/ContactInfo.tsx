// components/contact/ContactInfo.tsx
import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const ContactInfo: React.FC = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
      action: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@yourstore.com", "sales@yourstore.com"],
      action: "mailto:support@yourstore.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Commerce Street", "New York, NY 10001"],
      action:
        "https://maps.google.com/?q=123+Commerce+Street+New+York+NY+10001",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {contactDetails.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center mb-4">
            <item.icon className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
          </div>
          <div className="space-y-2">
            {item.details.map((detail, idx) => (
              <p key={idx} className="text-gray-600">
                {detail}
              </p>
            ))}
            {item.action && (
              <a
                href={item.action}
                target={item.icon === MapPin ? "_blank" : undefined}
                rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center mt-2"
              >
                {item.icon === Phone && "Call us"}
                {item.icon === Mail && "Email us"}
                {item.icon === MapPin && "Get directions"}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
