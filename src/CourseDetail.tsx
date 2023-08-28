import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./AxiosInstance";

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  courseImageUrl: string;
  price: string; // Assuming price is a string, adjust type if needed
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);

  useEffect(() => {
    // Fetch course details from the backend using Axios
    axiosInstance
      .get(`course/${courseId}`)
      .then((response) => {
        setCourseDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dark-violet min-h-screen py-16">
      <div className="container mx-auto">
        <div className="flex md:gap-8">
          <div className="relative h-[400px] bg-gray-700 rounded-md overflow-hidden md:w-[50%]">
            <img
              src={courseDetail.courseImageUrl}
              alt={courseDetail.title}
              className="h-full w-full rounded-md object-cover"
            />
            <div className="absolute bottom-0 p-4 w-full bg-opacity-75 bg-black text-white">
              <h1 className="text-3xl font-semibold mb-2">
                {courseDetail.title}
              </h1>
              <p className="text-gray-300">{courseDetail.description}</p>
            </div>
            <div className="bg-dark-violet text-white mt-4 p-4">
              <p>This is additional text at the end of the image div.</p>
            </div>
          </div>
          <div className="md:w-[50%]">
            <p className="text-gray-300 mb-4">
              This is a dummy line. Repeat this content for as many lines as
              needed.
            </p>
            {/* Add more <p> tags here */}
          </div>
        </div>
        {/* Additional text div outside of the image div */}
        {/* <div className="bg-dark-violet text-white mt-4 p-4">
          <p>This is additional text at the end of the image div.</p>
        </div> */}
        <div className="flex justify-between items-center mt-4">
          <button className="bg-violet text-white px-4 py-2 rounded hover:bg-gray-700">
            Enroll Now
          </button>
          <p className="text-gray-300">{courseDetail.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
// {Array(52)
//     .fill(null)
//     .map(() => (
//       <p className="text-gray-300 mb-4">
//         This is a dummy line. Repeat this content for as many lines as
//         needed.
//       </p>
//     ))}
