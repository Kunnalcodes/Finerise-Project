import React, { useRef, useEffect, useState } from "react";
import { cn } from "../lib/utils";

const ThreeDHoverGallery = ({
  cards = [],
  itemWidth = 14,
  itemHeight = 22,
  gap = 1.2,
  perspective = 50,
  hoverScale = 15,
  transitionDuration = 1.25,
  backgroundColor,
  grayscaleStrength = 0,
  brightnessLevel = 0.8,
  activeWidth = 35,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
  className,
  style,
  onCardClick,
  onCardHover,
  onCardFocus,
}) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    if (autoPlay && cards.length > 0) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? 0 : (prev + 1) % cards.length;
          return nextIndex;
        });
      }, autoPlayDelay);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
    if (!autoPlay && autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [autoPlay, autoPlayDelay, cards.length]);

  const handleCardClick = (index, card) => {
    setActiveIndex(activeIndex === index ? null : index);
    onCardClick?.(index, card);
  };

  const handleCardHover = (index, card) => {
    if (!autoPlay) {
      setActiveIndex(index);
    }
    onCardHover?.(index, card);
  };

  const handleCardLeave = () => {
    if (!autoPlay) {
      setActiveIndex(null);
    }
  };

  const handleCardFocus = (index, card) => {
    setFocusedIndex(index);
    onCardFocus?.(index, card);
  };

  const handleKeyDown = (event, index) => {
    if (!enableKeyboardNavigation) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleCardClick(index, cards[index]);
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : cards.length - 1;
        containerRef.current?.children[prevIndex]?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = index < cards.length - 1 ? index + 1 : 0;
        containerRef.current?.children[nextIndex]?.focus();
        break;
      default:
        break;
    }
  };

  const getItemStyle = (index) => {
    const isActive = activeIndex === index;
    const isFocused = focusedIndex === index;
    const baseWidthPx = 10;

    return {
      width: isActive
        ? `${activeWidth}vw`
        : `calc(${itemWidth}vw + ${baseWidthPx}px)`,
      height: `calc(${itemHeight}vw + ${itemHeight}vh)`,
      backgroundColor: cards[index]?.bg || "var(--surface-low)",
      cursor: "pointer",
      filter:
        isActive || isFocused
          ? "inherit"
          : `brightness(${brightnessLevel})`,
      transform: isActive
        ? `translateZ(calc(${hoverScale}vw + ${hoverScale}vh))`
        : "none",
      transition: `transform ${transitionDuration}s cubic-bezier(.1, .7, 0, 1), filter 3s cubic-bezier(.1, .7, 0, 1), width ${transitionDuration}s cubic-bezier(.1, .7, 0, 1)`,
      willChange: "transform, filter, width",
      zIndex: isActive ? 100 : "auto",
      margin: isActive ? "0 0.45vw" : "0",
      outline: isFocused ? "2px solid #3b82f6" : "none",
      outlineOffset: "2px",
      borderRadius: "1rem",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: isActive ? "0 20px 40px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.05)",
    };
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[550px] w-full overflow-hidden bg-transparent",
        className
      )}
      style={backgroundColor ? { backgroundColor, ...style } : style}
    >
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full"
        style={{
          perspective: `calc(${perspective}vw + ${perspective}vh)`,
          gap: `${gap}rem`,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative will-change-transform shadow-lg group"
            style={getItemStyle(index)}
            tabIndex={enableKeyboardNavigation ? 0 : -1}
            onClick={() => handleCardClick(index, card)}
            onMouseEnter={() => handleCardHover(index, card)}
            onMouseLeave={handleCardLeave}
            onFocus={() => handleCardFocus(index, card)}
            onBlur={() => setFocusedIndex(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            aria-label={`Card ${index + 1} of ${cards.length}`}
            aria-pressed={activeIndex === index}
          >
            {/* Background image if provided */}
            {card.image && (
              <div 
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.15,
                  zIndex: 0
                }}
              />
            )}
            
            {/* Gradient overlay for text readability */}
            <div 
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)",
                zIndex: 1
              }}
            />

            {/* Content Container */}
            <div 
              style={{
                position: "relative",
                zIndex: 2,
                padding: "2rem",
                color: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                opacity: activeIndex === index ? 1 : 0.6,
                transition: "opacity 0.4s ease"
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                color: "white"
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: activeIndex === index ? "1.75rem" : "1.25rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
                transition: "font-size 0.4s ease",
                whiteSpace: "nowrap",
              }}>
                {card.title}
              </h3>
              
              <div style={{
                overflow: "hidden",
                maxHeight: activeIndex === index ? "200px" : "0px",
                opacity: activeIndex === index ? 1 : 0,
                transition: "max-height 0.6s ease, opacity 0.4s ease",
              }}>
                <p style={{
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDHoverGallery;
