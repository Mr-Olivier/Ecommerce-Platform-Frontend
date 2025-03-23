// src/components/common/ChatWidget.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Mail,
  ArrowRight,
  Menu,
  CheckCircle,
  User,
  FileText,
  Volume2,
  Maximize2,
  LogOut,
  Code,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

// Add animation keyframes for professional transitions
const fadeInUpAnimation = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
`;

// Add global style for animations
const addGlobalStyle = () => {
  if (
    typeof document !== "undefined" &&
    !document.getElementById("chat-animations")
  ) {
    const styleEl = document.createElement("style");
    styleEl.id = "chat-animations";
    styleEl.innerHTML = fadeInUpAnimation;
    document.head.appendChild(styleEl);
  }
};

// Define types for our chat messages and FAQ data
interface ChatMessage {
  id: number;
  sender: "support" | "customer";
  text: string;
  time: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// E-commerce FAQ data
const ecommerceFAQs: FAQItem[] = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused and unopened items in their original packaging. For clothing and apparel, items must have all original tags attached. Please note that customized products cannot be returned unless defective.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'Order History' section. Alternatively, you can use the tracking number provided in your shipping confirmation email. If you're having trouble, please provide your order number and we'll check the status for you.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders are typically processed within 1-2 business days. Once shipped, delivery times vary based on your location and selected shipping method: Standard (3-5 business days), Express (1-2 business days), and International (7-14 business days). You'll receive a shipping confirmation email with tracking information once your order is on its way.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 100 countries worldwide. International delivery typically takes 7-14 business days, depending on customs processing. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.",
  },
  {
    question: "How can I change or cancel my order?",
    answer:
      "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this window, orders enter our fulfillment process and cannot be modified. If your order has already shipped, you'll need to follow our return process.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For select markets, we also offer buy-now-pay-later options through Klarna and Afterpay. All payments are processed securely through our encrypted payment gateway.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We take data security very seriously. Our website uses SSL encryption to protect all data transmissions, and we never store your full credit card information. Our privacy policy details how we collect, use, and protect your information, and we're fully GDPR and CCPA compliant.",
  },
];

// Function to get readable timestamp
const getTimeString = (): string => {
  const now = new Date();
  return now.getHours() >= 12
    ? `${now.getHours() === 12 ? 12 : now.getHours() - 12}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")} PM`
    : `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")} AM`;
};

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "support",
      text: "Hi there! 👋 Welcome to our online store. How can I assist you with your shopping today?",
      time: getTimeString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isInitialInfoProvided, setIsInitialInfoProvided] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // New states for the added features
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isPopped, setIsPopped] = useState(false);

  // Refs for new components
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Common emojis for quick access
  const commonEmojis = ["😀", "🍀", "🍔", "🏈", "🚗", "💡", "👍", "👎"];

  // Add common e-commerce question suggestions
  const [suggestions] = useState<string[]>([
    "What is your return policy?",
    "How do I track my order?",
    "Do you offer international shipping?",
    "What payment methods do you accept?",
    "When will my order ship?",
  ]);

  // Scroll to bottom of chat when messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, showContactForm, isEmojiPickerOpen]);

  // Handle click outside of menu and emoji picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If click is outside the menu and not on the menu button
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }

      // If click is outside the emoji picker and not on the emoji button
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, menuButtonRef, emojiPickerRef, emojiButtonRef]);

  // Function to get customer information before starting chat
  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) return;

    setIsInitialInfoProvided(true);

    // Add welcome message with customer name
    const welcomeMessage: ChatMessage = {
      id: chatHistory.length + 1,
      sender: "support",
      text: `Hi ${customerName}! 👋 Thanks for reaching out to our customer support. How can I help you with your shopping experience today?`,
      time: getTimeString(),
    };

    setChatHistory([welcomeMessage]);
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);

    // Optional: Auto-send the suggestion
    const customerMessage: ChatMessage = {
      id: chatHistory.length + 1,
      sender: "customer",
      text: suggestion,
      time: getTimeString(),
    };

    setChatHistory([...chatHistory, customerMessage]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      setIsTyping(false);

      // Find matching FAQ
      const faqMatch = ecommerceFAQs.find(
        (faq) => faq.question.toLowerCase() === suggestion.toLowerCase()
      );

      // Generate appropriate response based on the question
      const responseMessage: ChatMessage = {
        id: chatHistory.length + 2,
        sender: "support",
        text: faqMatch ? faqMatch.answer : showEmailFallbackMessage(),
        time: getTimeString(),
      };

      setChatHistory((prev) => [...prev, responseMessage]);

      // If no FAQ match was found, show the contact form
      if (!faqMatch) {
        setTimeout(() => {
          setShowContactForm(true);
        }, 1000);
      }
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds

    // Clear input after sending suggestion
    setMessage("");
  };

  // Handle emoji selection
  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    // Focus the input after adding emoji
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    // Close emoji picker after selection
    setIsEmojiPickerOpen(false);
  };

  // Toggle emoji picker
  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
    // Close menu if it's open
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Handle sending message in chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // Add customer message to chat
    const customerMessage: ChatMessage = {
      id: chatHistory.length + 1,
      sender: "customer",
      text: message,
      time: getTimeString(),
    };

    setChatHistory([...chatHistory, customerMessage]);

    // Clear the input field
    const sentMessage = message;
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Try to match with FAQ
    const lowerMessage = sentMessage.toLowerCase();
    let faqMatch: FAQItem | undefined;

    for (const faq of ecommerceFAQs) {
      const keywords = faq.question.toLowerCase().split(" ");
      const matchScore = keywords.filter(
        (word) => word.length > 3 && lowerMessage.includes(word)
      ).length;

      if (
        matchScore >= 2 ||
        lowerMessage.includes(faq.question.toLowerCase())
      ) {
        faqMatch = faq;
        break;
      }
    }

    // Simulate a response after a realistic delay
    setTimeout(() => {
      setIsTyping(false);

      // Generate contextual response
      const responseMessage: ChatMessage = {
        id: chatHistory.length + 2,
        sender: "support",
        text: faqMatch ? faqMatch.answer : showEmailFallbackMessage(),
        time: getTimeString(),
      };

      setChatHistory((prev) => [...prev, responseMessage]);

      // If no FAQ match was found, show the contact form
      if (!faqMatch) {
        setTimeout(() => {
          setShowContactForm(true);
          setContactMessage(sentMessage); // Pre-fill the contact message
        }, 1000);
      }
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  // Show the email fallback message
  const showEmailFallbackMessage = (): string => {
    return `I'm sorry, but this question requires more detailed attention from our support team. You can reach us directly at support@ourstore.com, or fill out the form below and we'll get back to you as soon as possible.`;
  };

  // States for success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [messageReference, setMessageReference] = useState("");

  // Handle email form submission
  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSubject.trim() || !contactMessage.trim()) return;

    // Simulate sending email
    setIsTyping(true);

    // Generate a reference number
    const reference = `REF-${
      Math.floor(Math.random() * 9000) + 1000
    }-${new Date().getFullYear()}`;
    setMessageReference(reference);

    setTimeout(() => {
      setIsTyping(false);
      setShowContactForm(false);
      setEmailSent(true);

      // Show success popup
      setShowSuccessPopup(true);

      // Add confirmation message to chat
      const confirmationMessage: ChatMessage = {
        id: chatHistory.length + 1,
        sender: "support",
        text: `Thank you for your message! Our team has received your inquiry and will respond to ${customerEmail} as soon as possible. Your reference number is ${reference}.`,
        time: getTimeString(),
      };

      setChatHistory((prev) => [...prev, confirmationMessage]);

      // Reset form
      setContactSubject("");
      setContactMessage("");

      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

      // Reset email sent flag after a delay
      setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    }, 1500);
  };

  // Menu functions
  const toggleMenu = () => {
    // Toggle menu state
    setIsMenuOpen(!isMenuOpen);
    // Close emoji picker if it's open
    if (isEmojiPickerOpen) setIsEmojiPickerOpen(false);
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    setIsMenuOpen(false);
  };

  const togglePopOut = () => {
    setIsPopped(!isPopped);
    setIsMenuOpen(false);
  };

  const endChatSession = () => {
    setChatHistory([
      {
        id: 1,
        sender: "support",
        text: "All our agents are busy right now! Please drop in a mail at support@ourstore.com and we will get back to you ASAP!",
        time: getTimeString(),
      },
    ]);
    setIsMenuOpen(false);
  };

  const emailTranscript = () => {
    alert("Transcript will be emailed to you shortly.");
    setIsMenuOpen(false);
  };

  const changeName = () => {
    const newName = prompt("Enter your name:");
    if (newName) {
      setCustomerName(newName);
    }
    setIsMenuOpen(false);
  };

  const addToWebsite = () => {
    alert("Copy the code snippet to add this chat to your website.");
    setIsMenuOpen(false);
  };

  // Add global styles when component mounts
  useEffect(() => {
    addGlobalStyle();
  }, []);

  return (
    <>
      {/* "WE ARE HERE" banner - only visible before opening chat */}
      {!isChatOpen && (
        <div className="fixed bottom-24 right-6 flex flex-col items-center space-y-3 z-50">
          {/* Chat Bubble */}
          <div className="relative bg-[#0066CC] text-white px-6 py-3 rounded-lg text-xl font-bold text-center shadow-lg">
            WE ARE <br /> HERE
            {/* Speech bubble tail - Moved to the bottom center edge */}
            <div
              className="absolute -bottom-3 right-0 w-0 h-0 
      border-l-[16px] border-l-transparent 
      border-r-[16px] border-r-transparent 
      border-t-[16px] border-t-[#0066CC]"
            ></div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-4 border-l-4 border-green-500 animate-fade-in-up">
          <div className="flex items-center">
            <div className="text-green-500 mr-3">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-gray-800 font-medium text-sm">
                Message Sent Successfully
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Reference: {messageReference}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-[#0066CC] text-white p-4 rounded-full shadow-lg hover:bg-[#0055AA] transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Open chat support"
      >
        {isChatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* On-site Chat Widget */}
      {isChatOpen && (
        <div
          className={`fixed bottom-24 right-6 bg-white rounded-lg shadow-xl w-80 z-50 overflow-hidden border border-gray-200
             ${
               isPopped
                 ? "top-24 left-24 h-[calc(100vh-48px)] w-[calc(100vw-48px)]"
                 : ""
             }`}
        >
          <div className="bg-[#0066CC] text-white p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-1 mr-2">
                  <MessageCircle className="h-4 w-4 text-[#0066CC]" />
                </div>
                <h3 className="font-semibold text-sm">Shop Support</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  ref={menuButtonRef}
                  onClick={toggleMenu}
                  className="hover:bg-[#0055AA] p-1 rounded transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:text-gray-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-xs mt-1">We typically reply within minutes</p>

            {/* MENU OPTIONS - Positioned directly under the menu button */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                style={{
                  right: 0,
                  top: "100%",
                  position: "absolute",
                  zIndex: 1000,
                }}
                className="mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-48"
              >
                <ul className="py-1">
                  <li>
                    <button
                      onClick={changeName}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      Change Name
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={emailTranscript}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      Email transcript
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={toggleSound}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <Volume2 className="h-4 w-4 mr-2 text-gray-500" />
                      Sound {isSoundOn ? "Off" : "On"}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={togglePopOut}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <Maximize2 className="h-4 w-4 mr-2 text-gray-500" />
                      {isPopped ? "Minimize widget" : "Pop out widget"}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={endChatSession}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2 text-gray-500" />
                      End this chat session
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={addToWebsite}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                    >
                      <Code className="h-4 w-4 mr-2 text-gray-500" />
                      Add Chat to your website
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {!isInitialInfoProvided ? (
            // Initial form to collect customer information
            <div className="p-3">
              <p className="text-gray-600 mb-3 text-sm">
                Please provide your information to start chatting with our
                support team.
              </p>
              <form onSubmit={handleStartChat} className="space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0066CC] text-white py-1 px-3 text-sm rounded-lg hover:bg-[#0055AA] transition-colors font-medium"
                >
                  Start Chat
                </button>
              </form>
            </div>
          ) : (
            // Chat interface after providing information
            <>
              <div className="p-3 bg-gray-50 h-64 overflow-y-auto">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg mb-2 max-w-[90%] ${
                      msg.sender === "support"
                        ? "bg-blue-100 rounded-bl-none ml-0"
                        : "bg-gray-200 rounded-br-none ml-auto"
                    }`}
                  >
                    <p className="text-gray-800 text-xs">{msg.text}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {msg.sender === "support" ? "Shop Support" : "You"} •{" "}
                      {msg.time}
                    </span>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex space-x-1 p-2 bg-blue-100 rounded-lg rounded-bl-none w-14 h-6 items-center">
                    <div
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "200ms" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "400ms" }}
                    ></div>
                  </div>
                )}

                {/* Email Contact Form for complex questions */}
                {showContactForm && !isTyping && !emailSent && (
                  <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm mb-2">
                    <div className="flex items-center mb-2">
                      <div className="bg-[#0066CC] p-1 rounded-full">
                        <Mail className="h-3 w-3 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-700 ml-2">
                        Contact Support Team
                      </h4>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded mb-3">
                      <p className="text-xs text-gray-700">
                        All our agents are busy right now! Please fill out this
                        form and we'll get back to you as soon as possible.
                      </p>
                    </div>
                    <form
                      onSubmit={handleEmailFormSubmit}
                      className="space-y-3"
                    >
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          value={customerName}
                          disabled
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          value={customerEmail}
                          disabled
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded bg-gray-50 text-gray-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="contact-subject"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          placeholder="Enter subject..."
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Your message..."
                          rows={3}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 bg-white"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#0066CC] text-white py-1 px-3 text-xs rounded hover:bg-[#0055AA] transition-colors font-medium flex items-center justify-center"
                      >
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Send
                      </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">
                      Or email us directly at{" "}
                      <a
                        href="mailto:support@ourstore.com"
                        className="text-[#0066CC] hover:underline"
                      >
                        support@ourstore.com
                      </a>
                    </p>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Emoji picker panel (shown only when emoji button is clicked) */}
              {isEmojiPickerOpen && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-md"
                  style={{ maxHeight: "150px", overflowY: "auto", zIndex: 10 }}
                >
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search Emoji"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-gray-800"
                    />
                  </div>

                  <div className="p-2">
                    <p className="text-xs text-gray-500 mb-1">
                      Smileys & People
                    </p>
                    <div className="grid grid-cols-8 gap-1">
                      {commonEmojis
                        .concat([
                          "😊",
                          "😇",
                          "🙂",
                          "🙃",
                          "😉",
                          "😌",
                          "😍",
                          "🥰",
                          "😘",
                          "😗",
                          "😙",
                          "😚",
                          "👍",
                          "👎",
                          "👌",
                          "✌️",
                          "🤞",
                          "🤙",
                          "👏",
                          "🙌",
                        ])
                        .map((emoji, i) => (
                          <button
                            key={i}
                            className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                            onClick={() => handleEmojiClick(emoji)}
                          >
                            <span className="text-lg">{emoji}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Emoji Selection */}
              <div className="px-3 py-1 bg-white border-t border-gray-200 flex overflow-x-auto">
                {commonEmojis.map((emoji, i) => (
                  <button
                    key={i}
                    className="p-1 mx-1 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors cursor-pointer"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    <span className="text-lg">{emoji}</span>
                  </button>
                ))}
              </div>

              {/* Quick suggestions */}
              <div className="px-3 py-2 bg-white border-t border-b border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Common questions:</p>
                <div className="flex flex-wrap gap-1 mb-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 py-1 rounded-full transition-colors whitespace-nowrap"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Only show input form if the contact form isn't showing */}
              {!showContactForm && (
                <div className="p-2 border-t border-gray-200 flex relative">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      ref={inputRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 bg-white pr-8"
                      style={{
                        caretColor: "#0066CC",
                      }}
                    />
                    <button
                      type="button"
                      ref={emojiButtonRef}
                      onClick={toggleEmojiPicker}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      😀
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className={`px-2 py-1 rounded-r-lg flex items-center transition-colors ${
                      message.trim()
                        ? "bg-[#0066CC] text-white hover:bg-[#0055AA]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!message.trim()}
                  >
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Footer with thumbs up/down - Uncomment if needed */}
              {/* <div className="p-2 bg-white border-t border-gray-200 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Type here and press enter...
                </div>
                <div className="flex space-x-1">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleEmojiClick("👍")}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleEmojiClick("👎")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>
              </div> */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
