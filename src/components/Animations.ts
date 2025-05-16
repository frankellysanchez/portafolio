export const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  export const hoverEffect = {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeOut" },
      outline: "2px solid #60A5FA",
      outlineOffset: "-2px"
    },
    whileTap: {
      scale: 0.97,
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };
  