import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import DummyCourseCard from "./DummyCourseCard";
import axios from "axios";

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  courseImageUrl: string;
}

const Courses: React.FC = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch data from the backend using Axios
    axios
      .get("/api/course")
      .then((response) => {
        setCoursesData(response.data);
        // console.log(response.data);
        setIsLoading(false);
        // setCoursesData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="bg-dark-violet my-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Render dummy card while loading
              Array.from({ length: 3 }).map((_, index) => (
                <DummyCourseCard key={index} />
              ))
            : // Render actual course cards after data is fetched
              coursesData.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
