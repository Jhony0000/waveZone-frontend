import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVideo } from "../../backend/videoApi/videoApi"; // Assume you have a function to fetch video data
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function VideoChart() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  // Fetch the video data
  useEffect(() => {
    const getUserVideo = async () => {
      try {
        const response = await getVideo(videoId);
        console.log("Video Data:", response.data.data);
        setVideo(response.data.data); // Store video data from the API
      } catch (error) {
        console.log("Error fetching video data:", error);
      }
    };

    if (videoId) {
      getUserVideo();
    }
  }, [videoId]);

  // Chart data setup
  const chartData = video
    ? {
        labels: [
          "2024-12-01",
          "2024-12-02",
          "2024-12-03",
          "2024-12-04",
          "2024-12-05",
          "2024-12-06",
        ], // Example dates
        datasets: [
          {
            label: "Views",
            data: [
              video.views - 2,
              video.views - 1,
              video.views,
              video.views + 1,
              video.views + 2,
              video.views,
            ], // Simulated views data for example
            borderColor: "#8884d8", // Line color
            backgroundColor: "rgba(136, 132, 216, 0.2)", // Fill color below the line
            fill: true, // Fill the area under the line
            tension: 0.3, // Smooth curve
          },
          {
            label: "Comments",
            data: [
              video.commentsCount - 1, // Simulated data for comments
              video.commentsCount,
              video.commentsCount + 1,
              video.commentsCount + 2,
              video.commentsCount + 3,
              video.commentsCount + 3,
            ], // Adjust this based on your data
            borderColor: "#82ca9d", // Line color
            backgroundColor: "rgba(130, 202, 157, 0.2)", // Fill color below the line
            fill: true, // Fill the area under the line
            tension: 0.3, // Smooth curve
          },
          {
            label: "Likes",
            data: [
              video.likeCount - 1, // Simulated data for likes
              video.likeCount,
              video.likeCount + 1,
              video.likeCount + 2,
              video.likeCount + 3,
              video.likeCount + 3,
            ], // Adjust this based on your data
            borderColor: "#ff7300", // Line color
            backgroundColor: "rgba(255, 115, 0, 0.2)", // Fill color below the line
            fill: true, // Fill the area under the line
            tension: 0.3, // Smooth curve
          },
        ],
      }
    : {}; // Empty data if no video is found

  if (!video) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-12">
          <h3>Video Analytics: {video.title}</h3>
          <div style={{ width: "100%", height: "300px" }}>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div> */}
        <div className="col-12 text-center">This features coming soon...</div>
      </div>
    </div>
  );
}

export default VideoChart;
