// pages/contact/index.tsx
import React from "react";
import { motion } from "framer-motion";
import { SEOHead } from "../../components/common/SEOHead";
import { ContactForm } from "../../components/contact/ContactForm";
import { ContactInfo } from "../../components/contact/ContactInfo";
import { ContactMap } from "../../components/contact/ContactMap";
import { FAQSection } from "../../components/contact/FAQSection";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";

const ContactPage: React.FC = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Stats data
  const stats = [
    {
      icon: MessageCircle,
      label: "Average Response Time",
      value: "< 2 hours",
    },
    {
      icon: Mail,
      label: "Support Tickets Resolved",
      value: "95%",
    },
    {
      icon: Clock,
      label: "Customer Satisfaction",
      value: "4.8/5",
    },
    {
      icon: MapPin,
      label: "Global Locations",
      value: "5+ offices",
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with our team for any questions, support, or feedback. We're here to help!"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We're Here to Help
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question, feedback, or need support? Our team is ready to
            assist you. Choose the most convenient way to reach us below.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm text-center"
              variants={fadeInUp}
            >
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <ContactInfo />
        </motion.div>

        {/* Contact Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-sm"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </motion.div>
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Visit Our Office
            </h2>
            <ContactMap />
            <div className="mt-4 text-gray-600">
              <p className="mb-2">
                <strong>Head Office:</strong> 123 Commerce Street, New York, NY
                10001
              </p>
              <p>
                <strong>Parking:</strong> Available on-site with validation
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="bg-gray-50 p-8 rounded-lg"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQSection />
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Our News
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates, exclusive offers,
            and helpful tips.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Add newsletter subscription logic here
            }}
            className="max-w-md mx-auto flex gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>

        {/* Additional Support Links */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Support Options
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/help-center"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Help Center
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/knowledge-base"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Knowledge Base
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/community"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Community Forum
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
