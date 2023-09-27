/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLock, FaUnlock } from "react-icons/fa";
import { AuthContext } from "./App";
import "./SuccessAnimation.css";
import axios from "axios";

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
  const [coursePurchased, setCoursePurchased] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const { isLoggedIn, user } = useContext(AuthContext)!;

  useEffect(() => {
    // Fetch course details from the backend using Axios
    axios
      .get(`/api/video/course/${courseDetail.id}`)
      .then((response) => {
        setVideoContents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    {
      isLoggedIn &&
        axios
          .get(`/api/course/verify/${courseDetail.id}`, {
            withCredentials: true,
          })
          .then((response) => {
            // console.log(response.data.result);
            setCoursePurchased(response.data.result);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }, [courseDetail.id, isLoggedIn]);
  // Function to trigger the animation
  const triggerAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      // window.location.reload();
    }, 2000); // Hide the animation after 2 seconds
  };
  if (!courseDetail) {
    return <div>Loading...</div>;
  }
  const handleOpenRazorpay = (orderData: any) => {
    const options = {
      key: import.meta.env.VITE_RAZORYPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: orderData.currency,
      name: "Subhajit's Course", //your business name
      description: courseDetail.title,
      order_id: orderData.id,
      handler: function (response: any) {
        // const responseData = {
        //   razorpay_payment_id:response.razorpay_payment_id,
        //   razorpay_order_id:response.razorpay_order_id,
        //   razorpay_signature:response.razorpay_signature
        // }
        axios
          .get(`/api/purchase/${response.razorpay_payment_id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data === "captured") {
              // console.log("yes payment done");
              triggerAnimation();
            }
          })
          .catch((err) => {
            console.log(err);
          });

        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: user?.username, //your customer's name
        email: user?.email,
        // contact: "9000090#3399cc000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        // address: "India",
        courseId: courseDetail.id,
        email: user?.email,
        price: courseDetail.price,
      },
      theme: {
        color: "#0e2255",
      },
    };

    const rzp1 = new (window as any).Razorpay(options);

    rzp1.open();
    // rzp1.on('payment.failed', function (response) {
    //   // Handle payment failure here
    //   console.log(response.error);
    // })
  };

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      //return the modal screen
      setShowMessageModal(true);
      return;
    }

    const reqBody = { amount: courseDetail.price };
    const res = await axios.post("/api/purchase/createOrder", reqBody, {
      withCredentials: true,
    });

    handleOpenRazorpay(res.data);
    // console.log(res.data);
  };

  return (
    <div className="bg-dark-violet py-16  text-white">
      <button onClick={triggerAnimation}>test</button>
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
              {!(isLoggedIn && coursePurchased) && (
                <button
                  className="bg-violet px-4 py-2 block mx-auto rounded hover:bg-gray-700"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
              )}
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
                  // to={`/courses/${courseDetail.id}/${video.id}`}
                  to={
                    isLoggedIn && coursePurchased
                      ? `/courses/${courseDetail.id}/${video.id}`
                      : "/#"
                  }
                  className={`${
                    isLoggedIn && coursePurchased
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  state={{
                    videoDetail: video,
                    videoContents,
                    courseId: courseDetail.id,
                  }}
                  key={video.id}
                >
                  <p
                    key={video.id}
                    className="text-gray-300 w-fit flex items-center mb-4"
                  >
                    {video.videoNo}. {video.title}{" "}
                    {isLoggedIn && coursePurchased ? (
                      <FaUnlock className="ml-2" />
                    ) : (
                      <FaLock className="ml-2" />
                    )}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      {showMessageModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-800">
          <div className="bg-gray-700 p-4 rounded shadow-lg">
            <p>User must be logged in to enroll.</p>
            <button
              onClick={() => setShowMessageModal(false)}
              className="bg-violet px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Success Animation */}
      {showAnimation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-green-500 p-8 rounded-lg shadow-lg text-center animate-party-blast">
            <p className="text-xl mb-4 font-semibold">Congratulations!!</p>
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-xl font-semibold">Enjoy your course!!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
