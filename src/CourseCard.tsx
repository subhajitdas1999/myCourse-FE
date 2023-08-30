import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  courseImageUrl: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-dark p-4 rounded-lg shadow-md text-white border-solid border-2 border-gray-400">
      <img
        src={course.courseImageUrl}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2 h-[25px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {course.title}
      </h2>
      <p className="text-gray-300 mb-4 h-[20px] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {course.description}
      </p>
      <div className="flex justify-between items-center">
        <Link to={`/courses/${course.id}`} state={{ courseDetail: course }}>
          <button className="bg-violet text-white px-4 py-2 rounded hover:bg-gray-700">
            Enroll Now
          </button>
        </Link>
        <p className="text-gray-300 text-xl">₹{course.price} /-</p>
      </div>
    </div>
  );
};

export default CourseCard;
