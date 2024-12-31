import React, { useEffect, useRef, useState } from "react";

// Component to display scroll-triggered animations
const ScrollAnimationComponent = () => {
  // Store references to each section
  const sectionRefs = useRef([]);

  // Add multiple sections dynamically
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Observe each section
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup the observer when the component is unmounted
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div>
      {[...Array(9)].map((_, index) => (
        <section
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className='scroll-component'>
          <h2>Section {index + 1}</h2>
          <p>
            This is section {index + 1}. Scroll down to see how it becomes
            visible with animation!
          </p>
        </section>
      ))}
    </div>
  );
};

export default ScrollAnimationComponent;
