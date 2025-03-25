// src/components/common/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  ChevronUp,
} from "lucide-react";
// Import the ChatWidget component
import ChatWidget from "./ChatWidget";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Monitor scroll position for scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const mainNavLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const customerService = [
    { name: "Shipping Information", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Payment Methods", href: "/payment" },
    { name: "Track Order", href: "/track-order" },
    { name: "FAQ", href: "/faq" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Commerce St, New York, NY 10001" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "support@estore.com" },
    {
      icon: Clock,
      text: "Working Hours: Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    },
  ];

  const socialMedia = [
    { name: "Facebook", icon: Facebook, color: "#1877F2" },
    { name: "Twitter", icon: Twitter, color: "#1DA1F2" },
    { name: "Instagram", icon: Instagram, color: "#E4405F" },
    { name: "Youtube", icon: Youtube, color: "#FF0000" },
  ];

  // Add this at the top of your component with other constants
  const paymentMethods = [
    {
      name: "Visa",
      icon: (
        <svg
          viewBox="0 0 780 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-12"
        >
          <path
            d="M290 358.6L329.5 141.4H386.5L346.9 358.6H290Z"
            fill="white"
          />
          <path
            d="M528.9 145.8C516.6 140.9 497.8 135.6 475 135.6C416.8 135.6 376.8 165.2 376.6 208.5C376.4 240.3 405.2 258.4 427 269.3C449.3 280.4 456.7 287.5 456.7 297.3C456.5 312.6 437.7 319.7 420.3 319.7C394.8 319.7 380.6 314.9 359.1 304.2L351.3 299.8L343 353.4C358 360.9 386.5 367.6 416.1 367.8C477.9 367.8 517.2 338.6 517.6 292.7C517.8 268.2 503.6 249.4 469.4 232.7C448.9 221.8 436.5 214.4 436.5 203.2C436.7 193.2 448.5 183.1 473.8 183.1C494.8 182.9 510.3 187.9 522 193L527.3 195.8L535.3 144.3L528.9 145.8Z"
            fill="white"
          />
          <path
            d="M617.3 141.4H673.2C682.7 142 689.9 144.5 694 153.7L721.6 246.3L720.3 141.4H781.8L739.3 358.6H677.9L612.9 179.5L590.3 329.9C587.8 342.8 578.3 358.6 564.1 358.6H512.1L513.4 352.5L518.5 333.7V331.8L559.8 164.4C563.4 149.6 577.8 141.4 598.3 141.4H617.3Z"
            fill="white"
          />
          <path
            d="M0 141.4L1.3 145.4C55.2 160.5 99 185.4 129.8 214.7L110.8 149.6C107.2 138.5 97.5 141.7 90.3 141.4H0Z"
            fill="#F9A533"
          />
          <path
            d="M0 141.4H78.7C98.5 141.7 114.6 149.8 120.3 168.6L146.6 271.1C146.6 271.1 149.3 280.3 150.5 283.6L173.2 214.4C147.6 179.7 94.1 150.7 40.7 141.4H0Z"
            fill="#17468B"
          />
          <path
            d="M150.5 283.6C148.1 277.7 146.6 271.1 146.6 271.1L120.3 168.6C114.6 149.8 98.5 141.7 78.7 141.4H36.8C44.8 141.7 56.6 143.2 60 155.1C78.2 214.7 121.6 277.4 150.5 283.6Z"
            fill="#F9A533"
          />
          <path
            d="M209 358.6L132.1 319.7L117.9 285.5C117.9 285.5 115.2 280.2 113.4 277.7C81.4 261.6 54.3 239.1 34 214.7L89.1 358.6H209Z"
            fill="#17468B"
          />
          <path
            d="M132.1 319.7L209 358.6H174.5C161.6 356.1 150.5 344.4 150.5 318.4C150.5 306.2 148.1 294 146.6 289.1C146.6 288.8 146.6 288.8 146.3 288.6C133.4 287.5 113.4 277.7 113.4 277.7C120.3 288.1 132.1 319.7 132.1 319.7Z"
            fill="#F9A533"
          />
          <path
            d="M146.3 288.6C146.6 288.8 146.6 288.8 146.6 289.1C148.1 294 150.8 304.8 150.8 318.4C150.8 338.3 164.1 354.1 174.5 358.6H89.1L34 214.4C45.1 228.5 58.8 241.6 74.3 252.7C91 265.3 109.6 275.9 127.9 282.7C127.9 285.5 129.8 286.7 130.8 286.9C136.9 288.4 146.3 288.6 146.3 288.6Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Mastercard",
      icon: (
        <svg
          viewBox="0 0 780 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-12"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M615.6 250C615.6 335.3 546.3 404.7 460.9 404.7C375.6 404.7 306.2 335.3 306.2 250C306.2 164.7 375.6 95.3 460.9 95.3C546.3 95.3 615.6 164.7 615.6 250Z"
            fill="#D9222A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M473.5 250C473.5 335.3 404.1 404.7 318.8 404.7C233.5 404.7 164.1 335.3 164.1 250C164.1 164.7 233.5 95.3 318.8 95.3C404.1 95.3 473.5 164.7 473.5 250Z"
            fill="#EE9F2D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M389.8 152.4C354.4 183.8 332.3 215.9 320.5 250C332.3 284.1 354.4 316.2 389.8 347.6C425.3 316.2 447.4 284.1 459.2 250C447.4 215.9 425.3 183.8 389.8 152.4Z"
            fill="#D9222A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M640.5 351.2V347.6H639.3L638.1 350L637 347.6H635.8V351.2H636.7V348.5L637.8 351.2H638.5L639.6 348.5V351.2H640.5ZM634.1 351.2V348.5H635.5V347.6H631.7V348.5H633.2V351.2H634.1Z"
            fill="#F79410"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M245.2 306.2V193.8H270.9C273.8 193.8 276.7 194.1 279.6 194.7C282.6 195.3 285.2 196.4 287.3 198.2C289.4 200 291.2 202.3 292.6 205.3C293.8 208.2 294.4 212 294.4 216.7C294.4 223.7 292.9 229.1 289.7 232.9C286.7 236.7 282.3 238.5 276.7 238.5H257.9V306.2H245.2ZM257.9 227.3H272C274.7 227.3 277.3 226.4 279.6 224.6C281.8 222.8 282.9 219.1 282.9 213.5C282.9 210.5 282.6 208.2 281.8 206.4C281.2 204.6 280.2 203.2 279.1 202.3C278 201.4 276.7 200.8 275.3 200.5C273.8 200.2 272.3 200 270.9 200H257.9V227.3Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M300.8 306.2V193.8H341.7V200.8H313.5V242.9H340.6V249.7H313.5V299.4H341.7V306.2H300.8Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M412 209.9C410.3 207.3 408.2 205.2 405.6 203.7C402.9 202.3 399.9 201.4 396.5 201.4C390.9 201.4 386.2 203.2 382.3 206.7C378.5 210.2 376.7 214.9 376.7 220.8C376.7 226.7 378.5 231.4 382.3 234.9C386.2 238.5 390.9 240.2 396.5 240.2C399.7 240.2 402.6 239.6 405 238.2C407.6 236.7 409.7 234.9 411.4 232.6L419.9 237.9C417.3 241.7 413.8 244.7 409.4 246.8C405 248.8 400.6 249.7 395.9 249.7C392.4 249.7 389.1 249.1 385.9 248.2C382.6 247.1 379.7 245.5 377.3 243.5C374.7 241.4 372.6 238.8 371.2 235.5C369.7 232.3 368.8 228.5 368.8 224.3C368.8 220 369.7 216.1 371.2 212.9C372.6 209.6 374.7 206.7 377.3 204.6C379.7 202.3 382.6 200.8 385.9 199.7C389.1 198.5 392.4 198.2 395.9 198.2C400.3 198.2 404.7 199.1 408.8 200.8C412.9 202.6 416.4 205.2 419.1 208.8L412 209.9Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M498.4 306.2L476.9 260.2H460.9V306.2H448.3V193.8H474.8C483.3 193.8 489.8 196.1 494.6 200.8C499.3 205.5 501.6 211.1 501.6 217.6C501.6 222.8 500.2 227.3 497.5 231.1C494.6 235 490.7 237.6 485.7 238.8L508.9 306.2H498.4ZM460.9 253.5H475.4C478.1 253.5 480.4 253.2 482.7 252.3C484.8 251.5 486.8 250.3 488.3 248.8C489.8 247.4 490.9 245.5 491.8 243.5C492.4 241.4 492.8 239.4 492.8 237C492.8 234.9 492.4 232.9 491.8 230.8C491.2 228.8 490.1 227 488.6 225.5C487.1 224 485.4 222.8 483.3 221.9C481.2 221.1 478.9 220.8 476.3 220.8H460.9V253.5Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M521.9 306.2V300H523.4V302.6H523.7L526 300H527.8L525.2 302.9L528.1 306.2H526.3L524 303.5H523.4V306.2H521.9ZM518.6 306.2V300H522.8V301.2H520.1V302.3H522.5V303.5H520.1V305H522.8V306.2H518.6Z"
            fill="#F79E1B"
          />
        </svg>
      ),
    },
    {
      name: "PayPal",
      icon: (
        <svg
          viewBox="0 0 780 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-12"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M444.1 146.1C431.8 133.8 411.1 128.5 384.2 128.5H295.5C289.4 128.5 284.1 133.1 283.1 139.1L238.1 380.2C237.3 384.9 240.8 389.2 245.6 389.2H297.4L311.1 305.2L311.5 307.5C312.5 313.6 317.8 318.2 323.9 318.2H352.1C412.1 318.2 459.5 292.9 474.1 222.9C474.8 219.6 475.3 216.6 475.8 213.6C473.1 181.2 458.6 161.2 444.1 146.1Z"
            fill="#27346A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M484.2 215.9C483.7 219.2 483.2 222.2 482.4 225.2C467.8 295.2 420.4 320.6 360.4 320.6H332.2C326.1 320.6 320.8 315.9 319.8 309.9L319.3 307.6L305.6 391.6H253.8C249 391.6 245.6 387.2 246.3 382.6L291.3 141.5C292.3 135.4 297.6 130.8 303.7 130.8H392.4C419.4 130.8 440 136.1 452.4 148.5C466.9 163.6 481.4 183.5 484 215.9H484.2Z"
            fill="#27346A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M322.7 225.2C323.5 220.4 327.5 216.9 332.2 216.3C334.4 216.1 336.5 216.1 338.9 216.1H429.2C438.1 216.1 446.2 216.6 453.4 217.9C456.5 218.4 459.5 219.2 462.3 219.9C465.1 220.7 467.8 221.7 470.4 222.9C471.9 206.4 467.6 194.1 455.7 181.7C441.9 167.9 419.4 161.9 390.5 161.9H297C290.1 161.9 284.3 167.4 283.1 174.2L234.8 434.4C233.9 440.2 238.3 445.4 244.1 445.4H301.5L321.9 311.9L322.7 225.2Z"
            fill="#2790C3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M470.4 222.9C467.8 221.7 465.1 220.7 462.3 219.9C459.5 219.2 456.5 218.4 453.4 217.9C446.2 216.6 438.1 216.1 429.2 216.1H338.9C336.5 216.1 334.4 216.1 332.2 216.3C327.5 216.9 323.5 220.4 322.7 225.2L321.9 311.9L319.8 309.9C320.8 315.9 326.1 320.6 332.2 320.6H360.4C420.4 320.6 467.8 295.2 482.4 225.2C483.2 222.2 483.7 219.2 484.2 215.9C481.4 212.9 477.4 210.4 473.1 208.4C472.4 213.6 471.6 218.4 470.4 222.9Z"
            fill="#1F264F"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M322.7 225.2C323.5 220.4 327.5 216.9 332.2 216.3C334.4 216.1 336.5 216.1 338.9 216.1H429.2C438.1 216.1 446.2 216.6 453.4 217.9C456.5 218.4 459.5 219.2 462.3 219.9C465.1 220.7 467.8 221.7 470.4 222.9C471.6 218.4 472.4 213.6 472.9 208.4C472.9 208.4 472.9 208.4 472.9 208.2C468.6 206.7 464.1 205.4 459.3 204.4C448.9 202.4 437.1 201.7 425.5 201.7H336.7C333.4 201.7 330.4 203.2 328.7 205.7C326.5 208.2 325.5 211.7 326 215.1L337.2 283.5V287.9L322.7 225.2Z"
            fill="#1B1464"
          />
        </svg>
      ),
    },
    {
      name: "Apple Pay",
      icon: (
        <svg
          viewBox="0 0 780 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-12"
        >
          <rect width="780" height="500" rx="40" fill="black" />
          <path
            d="M339.3 235.2C337.7 237 335.4 238.6 332.5 239.9C329.6 241.2 326.5 241.9 323.3 241.9C318.3 241.9 314.3 240.5 311.4 237.6C308.5 234.7 307 231.2 307 227.1C307 222.9 308.5 219.4 311.4 216.5C314.3 213.7 318.3 212.2 323.3 212.2C326.4 212.2 329.2 212.9 331.8 214.3C334.4 215.7 336.3 217.5 337.6 219.8L328.5 225.1C327.6 223 325.9 222 323.3 222C321.1 222 319.3 222.7 318 224.1C316.7 225.5 316 227.1 316 229C316 230.9 316.7 232.5 318 233.9C319.3 235.3 321.1 236 323.3 236C326.2 236 328.1 234.9 329.2 232.8L339.3 235.2ZM369.5 217.5C372.3 220.3 373.7 223.7 373.7 227.8C373.7 232 372.3 235.4 369.5 238.2C366.6 241 363.1 242.4 358.8 242.4C354.6 242.4 351 241 348.2 238.2C345.4 235.4 344 232 344 227.8C344 223.7 345.4 220.3 348.2 217.5C351 214.7 354.6 213.3 358.8 213.3C363.1 213.3 366.6 214.7 369.5 217.5ZM354.6 224.2C353.1 225.7 352.4 227.5 352.4 229.5C352.4 231.5 353.1 233.3 354.6 234.8C356.1 236.3 357.9 237.1 360 237.1C362.1 237.1 363.9 236.3 365.4 234.8C366.9 233.3 367.6 231.5 367.6 229.5C367.6 227.5 366.9 225.7 365.4 224.2C363.9 222.7 362.1 222 360 222C357.9 222 356.1 222.7 354.6 224.2ZM399.5 217.5C402.3 220.3 403.7 223.7 403.7 227.8C403.7 232 402.3 235.4 399.5 238.2C396.6 241 393.1 242.4 388.8 242.4C384.6 242.4 381 241 378.2 238.2C375.4 235.4 374 232 374 227.8C374 223.7 375.4 220.3 378.2 217.5C381 214.7 384.6 213.3 388.8 213.3C393.1 213.3 396.6 214.7 399.5 217.5ZM384.6 224.2C383.1 225.7 382.4 227.5 382.4 229.5C382.4 231.5 383.1 233.3 384.6 234.8C386.1 236.3 387.9 237.1 390 237.1C392.1 237.1 393.9 236.3 395.4 234.8C396.9 233.3 397.6 231.5 397.6 229.5C397.6 227.5 396.9 225.7 395.4 224.2C393.9 222.7 392.1 222 390 222C387.9 222 386.1 222.7 384.6 224.2ZM425.6 213.3C429.3 213.3 432.4 214.7 434.8 217.4C437.2 220.1 438.4 223.6 438.4 227.9C438.4 231.9 437.2 235.3 434.9 238C432.5 240.7 429.4 242.1 425.7 242.1C421.6 242.1 418.6 240.6 416.6 237.7V241.9H408.6V204.6H416.6V217.6C418.6 214.7 421.6 213.3 425.6 213.3ZM417.6 233.9C419 235.3 420.9 236 423.1 236C425.3 236 427.1 235.3 428.6 233.8C430 232.3 430.7 230.4 430.7 228.2C430.7 226 430 224.1 428.6 222.6C427.1 221.1 425.3 220.4 423.1 220.4C420.9 220.4 419 221.1 417.6 222.6C416.2 224.1 415.5 226 415.5 228.2C415.5 230.4 416.2 232.3 417.6 233.9ZM442.5 220.3V213.8H449.7V220.3H455.7V226.8H449.8V232.9C449.8 233.9 450 234.6 450.5 235.1C451 235.6 451.6 235.8 452.5 235.8C453.4 235.8 454.5 235.5 455.7 234.8V241.1C454 241.9 452.1 242.3 450 242.3C447.4 242.3 445.4 241.5 444.1 240C442.8 238.5 442.2 236.3 442.2 233.5V226.8H438.1V220.3H442.5ZM471.3 213.3C475.1 213.3 478.2 214.7 480.6 217.5C483 220.3 484.2 223.7 484.2 227.7C484.2 228.6 484.1 229.4 484 230.1H471.3C471.5 231.9 472.2 233.3 473.3 234.3C474.5 235.3 475.9 235.8 477.6 235.8C480.2 235.8 482.1 234.9 483.5 233L485.1 240.1C482.5 241.6 479.4 242.4 475.9 242.4C471.4 242.4 467.7 241 464.9 238.3C462.1 235.6 460.7 232.1 460.7 227.9C460.7 223.7 462.1 220.3 464.8 217.5C467.5 214.7 471 213.3 471.3 213.3ZM474.4 222.9C473.4 222 472.3 221.5 471 221.5C469.7 221.5 468.6 222 467.6 222.9C466.6 223.8 466 224.9 465.8 226.2H475.9C475.7 224.9 475.3 223.8 474.4 222.9Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "American Express",
      icon: (
        <svg
          viewBox="0 0 780 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-12"
        >
          <path fill="#016FD0" d="M0 0H780V500H0z" />
          <path
            d="M391.9 234L359.5 161.7H326.1V246.7L268.8 161.7H238.2V338.3H271.6V252.7L329.6 338.3H359.5V252.7L391.9 234ZM432.3 338.3H544.8V308.2H465.6V267.1H542.5V237H465.6V191.8H544.8V161.7H432.3V338.3Z"
            fill="white"
          />
          <path
            d="M155.2 338.3H192.4L203.6 308.2H253.5L264.7 338.3H303L253.5 221.9V191.8H213.6L155.2 338.3ZM213.6 278.1L229.3 235.7L245 278.1H213.6Z"
            fill="white"
          />
          <path
            d="M624.8 338.3H650.9L623.6 300.3C637.1 293.8 648.3 280.7 648.3 259C648.3 227 629.3 200.7 588.1 200.7H542.5V231.5H585.9C605.6 231.5 614.4 241.6 614.4 259.7C614.4 278.7 603.9 288.8 585.9 288.8H542.8V338.3H624.8Z"
            fill="white"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#001D3D] text-white relative">
      {/* Add the ChatWidget here */}
      <ChatWidget />

      {/* Add Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-24 bg-[#003366] hover:bg-[#00264C] text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      {/* Newsletter Section */}
      <div className="bg-[#002D5B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100">
                Subscribe to our newsletter for exclusive deals, new products,
                and latest updates.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-80 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-blue-200 border border-blue-300/30 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-[#001D3D] rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="text-3xl font-bold text-white">EStore</span>
            </Link>
            <p className="text-blue-100 leading-relaxed">
              Your premier destination for quality products and exceptional
              service. Discover the perfect blend of style, innovation, and
              reliability.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-blue-100"
                  >
                    <Icon className="h-5 w-5 text-blue-300 mt-1 flex-shrink-0" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rest of your footer code continues... */}
          {/* Main Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Main Navigation
            </h3>
            <ul className="space-y-4">
              {mainNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center text-blue-100 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media Section */}
            <h3 className="text-lg font-semibold mt-8 mb-4 text-white">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href="#"
                    className="flex items-center justify-center h-10 w-10 rounded-full transition-transform hover:scale-110"
                    style={{ backgroundColor: social.color }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Customer Service
            </h3>
            <ul className="space-y-4">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center text-blue-100 hover:text-white transition-colors duration-200"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App & Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Download Our App
            </h3>
            <p className="text-blue-100 mb-6">
              Shop smarter and faster with our mobile app.
            </p>
            <div className="space-y-4 mb-8">
              <a href="#" className="block w-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on App Store"
                  className="h-10 w-auto"
                />
              </a>
              <a href="#" className="block w-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            {/* Payment Methods */}

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Payment Methods
              </h3>
              <div className="flex flex-wrap gap-3">
                {/* Payment method icons */}
                <div className="bg-white rounded-md p-1 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {paymentMethods[0].icon}
                </div>
                <div className="bg-white rounded-md p-1 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {paymentMethods[1].icon}
                </div>
                <div className="bg-white rounded-md p-1 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {paymentMethods[2].icon}
                </div>
                {/* <div className="bg-white rounded-md p-1 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {paymentMethods[3].icon}
                </div>
                <div className="bg-white rounded-md p-1 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {paymentMethods[4].icon}
                </div> */}
              </div>
              <p className="text-blue-200 text-xs mt-3">
                Shop with confidence using your preferred payment method
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-blue-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-blue-200">
              © {new Date().getFullYear()} EStore. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm text-blue-200">
              <Link
                to="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cookies"
                className="hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
