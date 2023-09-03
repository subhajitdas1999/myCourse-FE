import { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance";
import VideoPlayer from "./VideoPlayer";
import { Link, useLocation } from "react-router-dom";

interface VideoContent {
  id: string;
  title: string;
  videoName: string;
  videoNo: string;
  courseId: string;
}

const VideoDisplay: React.FC = () => {
  const [signedVideoUrl, setSignedVideoUrl] = useState("");
  const location = useLocation();
  const videoDetail = location.state?.videoDetail as VideoContent;
  const videoContents = location.state?.videoContents as VideoContent[];
  const courseId = location.state?.courseId as string;
  //   console.log(courseId);

  useEffect(() => {
    // Make a request to get the signed URL from your server
    axiosInstance
      .get(`video/${videoDetail.videoName}`)
      .then((response) => {
        console.log("here");

        setSignedVideoUrl(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [videoDetail.id, videoDetail.videoName]);

  return (
    <div className="flex p-8">
      {/* Left column for the video player */}
      <div className="flex-1">
        {signedVideoUrl ? (
          <VideoPlayer key={videoDetail.id} videoUrl={signedVideoUrl} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Right column for links */}
      <div className=" w-2/5 p-4 text-gray-300">
        {videoContents.map((video) => {
          if (video.videoNo != videoDetail.videoNo) {
            return (
              <Link
                to={`/courses/${courseId}/${video.id}`}
                state={{
                  videoDetail: video,
                  videoContents,
                  courseId,
                }}
                key={video.id}
              >
                <p key={video.id} className="text-gray-300 mb-4 w-fit">
                  {video.videoNo}. {video.title}
                </p>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};

export default VideoDisplay;
