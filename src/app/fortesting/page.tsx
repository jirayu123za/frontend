"use client";
import React, { useRef } from "react";

function Page() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleClick = () => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>SHOPPING NOW</button>
      <div></div>
      <h1 ref={headingRef} className="text-xl/8 text-gray-700" tabIndex={0}>
        Products
      </h1>
    </div>
  );
}

export default Page;
