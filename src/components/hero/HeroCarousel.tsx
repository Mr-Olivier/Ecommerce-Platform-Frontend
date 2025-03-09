// src/components/hero/HeroCarousel.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Image data for the carousel
const heroImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    alt: "Premium fashion collection",
    title: "Discover Amazing Products",
    subtitle:
      "Shop the latest trends and find your perfect style with our curated collection.",
    cta: "Summer Collection",
    accent: "Up to 40% Off",
    position: "right", // Image positioning
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop",
    alt: "Home essentials collection",
    title: "Elevate Your Home",
    subtitle: "Premium home essentials crafted for comfort and style.",
    cta: "Home Collection",
    accent: "Free Shipping",
    position: "left",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop",
    alt: "Tech accessories",
    title: "Tech That Excites",
    subtitle: "Cutting-edge accessories for your everyday tech needs.",
    cta: "Tech Accessories",
    accent: "New Arrivals",
    position: "center",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.15,
        duration: 0.5,
      },
    }),
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Auto-advance the carousel
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [current, isAutoPlaying]);

  // Pause auto-play when user interacts
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  // Slide navigation
  const nextSlide = () => {
    setCurrent((prevCurrent) => (prevCurrent + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? heroImages.length - 1 : prevCurrent - 1
    );
  };

  // Indicator click
  const goToSlide = (index: number) => {
    setCurrent(index);
    pauseAutoPlay();
    setTimeout(resumeAutoPlay, 5000);
  };

  // Direction of transition
  const [[page, direction], setPage] = useState([0, 0]);

  const updatePage = (newPage: number, newDirection: number) => {
    setPage([newPage, newDirection]);
  };

  useEffect(() => {
    const newDirection = page > current ? -1 : 1;
    updatePage(current, newDirection);
  }, [current]);

  return (
    <div className="relative overflow-hidden h-[600px] sm:h-[650px] lg:h-[700px] w-full">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700/80 to-black/70 mix-blend-multiply z-10" />

      {/* Image carousel */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-grid-white/[0.05] z-10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <img
            src={heroImages[current].src}
            alt={heroImages[current].alt}
            className="object-cover h-full w-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${current}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`max-w-xl ${
              heroImages[current].position === "right"
                ? "ml-auto mr-0"
                : heroImages[current].position === "center"
                ? "mx-auto text-center"
                : "ml-0 mr-auto"
            }`}
          >
            <motion.span
              custom={0}
              variants={contentVariants}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium text-sm mb-6"
            >
              {heroImages[current].accent}
            </motion.span>

            <motion.h1
              custom={1}
              variants={contentVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {heroImages[current].title}
            </motion.h1>

            <motion.p
              custom={2}
              variants={contentVariants}
              className="text-xl md:text-2xl text-white/80 mb-8"
            >
              {heroImages[current].subtitle}
            </motion.p>

            <motion.div
              custom={3}
              variants={contentVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-200 shadow-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to={`/collection/${heroImages[current].cta
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white border-2 border-white hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
              >
                {heroImages[current].cta}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-30">
          <button
            onClick={() => {
              prevSlide();
              pauseAutoPlay();
              setTimeout(resumeAutoPlay, 5000);
            }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
            aria-label="Previous slide"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-white w-8"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
              />
            ))}
          </div>

          <button
            onClick={() => {
              nextSlide();
              pauseAutoPlay();
              setTimeout(resumeAutoPlay, 5000);
            }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200"
            aria-label="Next slide"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
