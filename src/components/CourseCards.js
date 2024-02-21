import React from "react";

import "./CourseCards.css";
import CourseCard from "./CourseCard";

export default function CourseCards() {
  return (
    <>
      <div
        className="course-card-container"
      >
        {Array.from({ length: 10 }, (_, index) => (
          <CourseCard key={index} />
        ))}
      </div>
    </>
  );
}
