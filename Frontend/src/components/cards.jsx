// src/components/ui/card.jsx
import React from "react";

// Optional utility: classNames combiner
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Base Card container
const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Inner content padding area
const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
};

export { Card, CardContent };
