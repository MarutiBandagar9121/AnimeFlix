import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";
const AnimeVideos=()=>{
    const {animeid}=useParams();
    const [videoData, setVideoData] = useState([]);
    const obj={animeid};
    console.log("anime is=",animeid);
    const datajson=JSON.stringify(obj);
    useEffect(() => {
    // Fetch data from your backend API
    fetch("http://localhost:8000/videodata.php",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: datajson,
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.episodenumber - b.episodenumber);
        setVideoData(sortedData);
      })
      .catch((error) => console.error("Error fetching anime data:", error));
  }, []);
  useEffect(() => {
    if (videoData.length > 0) {
      console.log(videoData); 
    }
  }, [videoData]);

  return(
    <>
    {videoData.length > 0 && (
        <Video vidDetails={videoData} />
      )}
    </>
  );

}
export default AnimeVideos;