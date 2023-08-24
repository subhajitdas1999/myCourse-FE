import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axiosInstance from "./AxiosInstance";

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  courseImageUrl: string;
}

const Courses: React.FC = () => {
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  useEffect(() => {
    // Fetch data from the backend using Axios
    axiosInstance
      .get("course")
      .then((response) => {
        setCoursesData(response.data);
        // console.log(response.data);

        // setCoursesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="bg-dark-violet my-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
