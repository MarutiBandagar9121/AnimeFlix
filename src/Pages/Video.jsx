import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EpisodeListItem from "../components/EpisodeListItem";
import VideoDiv from "../components/VideoDiv";

const Video = ({ vidDetails }) => {
  const history = useNavigate();
  console.log("video details", vidDetails);
  const [selectedEpisode, setSelectedEpisode] = useState(
    vidDetails[0]?.episodenumber || null
  );
  const [animedata, setanimedata] = useState(null);

  useEffect(() => {
    if (vidDetails && vidDetails.length > 0) {
      const obj = { animeid: vidDetails[0].animeid };
      const datajson = JSON.stringify(obj);

      // Fetch data from your backend API
      fetch("http://localhost:8000/animedata.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: datajson,
      })
        .then((response) => response.json())
        .then((data) => {
          setanimedata(data);
        })
        .catch((error) => console.error("Error fetching anime data:", error));
    }
  }, [vidDetails]);

  useEffect(() => {
    console.log("anime data", animedata);
  }, [animedata]);

  useEffect(() => {
    console.log("Episode selected:", selectedEpisode);
  }, [selectedEpisode]);

  const handleEpisodeButtonClick = (epino) => {
    setSelectedEpisode(epino);
  };
  function backButtonClicked(){
    history("/AnimeList");
  }

  return (
    <>
      {/* parent container with screen taking full width */}
      <div className="  w-screen bg-neutral-900 h-screen flex flex-col">
        {/* header with logo  and back button*/}
        <div className=" border-2 border-white flex justify-between p-5 rounded-lg">
          {/* logo image */}
          <img
            src="/images/animieFlix.png"
            className="w-40 drop-shadow-xl shadow-black bg-cover bg-center bg-gradient-to-t"
            alt="ANIMIE FLIX"
          />
          {/* back arraow*/}
          <button onClick={backButtonClicked}>
            <img src="/images/back-arrow.png" alt="Back" className="w-10" />
          </button>
        </div>
        {/* parent container for videopalyer and episode list */}
        <div className=" h-full flex flex-row">
          {/* video division div */}
          {animedata &&
            animedata[0].thumbnailsource !== null &&
            selectedEpisode !== null && (
              // <VideoDiv
              //   vidurl={vidDetails[0].video_url}
              //   thumbnailsrc={animedata[0].thumbnailsource}
              //   episodeno={vidDetails[0].episodenumber}
              //   episodename={vidDetails[0].vname}
              //   episodedesc={vidDetails[0].videodescription}
              // />

              <VideoDiv
                vidurl={vidDetails[selectedEpisode - 1].video_url} 
                thumbnailsrc={animedata[0].thumbnailsource} 
                episodeno={vidDetails[selectedEpisode - 1].episodenumber}
                episodename={vidDetails[selectedEpisode - 1].vname}
                episodedesc={vidDetails[selectedEpisode - 1].videodescription}
              />
            )}
          {/* episodes list division div */}
          <div className=" w-2/5 flex flex-col">
            {/* episode list box container */}
            <div className="border-2 border-white m-4 h-full rounded-3xl flex flex-col ">
              {/* div title */}
              <div className=" m-4  rounded-3xl text-center">
                <h3 className="font-bold text-xl ">EPISODES</h3>
              </div>
              {/* scrollable episode list container */}
              {/* border-2 border-white rounded-3xl */}
              <div className=" m-4 overflow-y-auto overflow-x-hidden flex-grow  h-64">
                {vidDetails.map((vid, index) => (
                  <EpisodeListItem
                    epino={vidDetails[index].episodenumber}
                    epiname={vidDetails[index].vname}
                    buttonClicked={handleEpisodeButtonClick}
                    isSelected={
                      selectedEpisode === vidDetails[index].episodenumber
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
