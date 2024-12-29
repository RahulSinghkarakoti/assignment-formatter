import { useState, useEffect } from "react";

const TopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

 
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) { // Check the scroll position
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 left-3 px-2 py-2 bg-blue-400 text-white rounded-md cursor-pointer "
          
        >
          Go to Top
        </button>
      )}
    </div>
  );
};

export default TopBtn;
