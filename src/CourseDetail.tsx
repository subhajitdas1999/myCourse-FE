// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "./AxiosInstance";

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  courseImageUrl: string;
  price: string; // Assuming price is a string, adjust type if needed
}

interface VideoContent {
  id: string;
  title: string;
  videoName: string;
  videoNo: string;
  courseId: string;
}

const CourseDetail: React.FC = () => {
  // const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const courseDetail = location.state?.courseDetail as CourseDetail;
  const [videoContents, setVideoContents] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch course details from the backend using Axios
    axiosInstance
      .get(`video/course/${courseDetail.id}`)
      .then((response) => {
        setVideoContents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseDetail.id]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dark-violet py-16  text-white">
      <div className="container mx-auto">
        <div className="flex md:gap-8">
          <div className="h-[400px] bg-gray-700 rounded-md overflow-hidden md:w-[50%]">
            <img
              src={courseDetail.courseImageUrl}
              alt={courseDetail.title}
              className="h-full w-full rounded-md object-cover"
            />

            <div className="absolute mt-10 w-[45%] ">
              <p className="text-2xl font-semibold mb-2">
                {courseDetail.title}
              </p>
              <p className="text-gray-300 my-5 ">{courseDetail.description}</p>
              <button className="bg-violet px-4 py-2 block mx-auto rounded hover:bg-gray-700">
                Enroll Now
              </button>
            </div>
          </div>
          <div className="md:w-[50%]">
            {loading ? (
              <div className="bg-dark rounded-lg shadow-md text-white animate-pulse h-[280px] w-2/4">
                <h2 className="text-xl font-semibold mb-4 bg-gray-700 h-6 rounded"></h2>
                <h2 className="text-xl font-semibold mb-4 bg-gray-700 h-6 rounded"></h2>
                <h2 className="text-xl font-semibold mb-4 bg-gray-700 h-6 rounded"></h2>
              </div>
            ) : (
              videoContents.map((video) => (
                <Link
                  to={`/courses/${courseDetail.id}/${video.id}`}
                  state={{
                    videoDetail: video,
                    videoContents,
                    courseId: courseDetail.id,
                  }}
                  key={video.id}
                >
                  <p key={video.id} className="text-gray-300 mb-4 w-fit">
                    {video.videoNo}. {video.title}
                  </p>
                </Link>
              ))
            )}
          </div>
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