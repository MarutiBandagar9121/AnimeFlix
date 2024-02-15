import ReactPlayer from "react-player";
const VideoDiv = ({vidurl,thumbnailsrc,episodeno,episodename,episodedesc}) => {
  return (
    <>
      <div className="  w-3/5 flex flex-col ">
        {/* vido player div */}
        <div className="border-2 border-white  p-0 my-4 player-wrapper rounded-md">
          <ReactPlayer
          // /home/maruti/Documents/react/ott/PHP/video/naruto_episode1.mp4
            url={vidurl}
            className=""
            loop={false}
            controls={true}
            playing={true}
            light={
              <img src={thumbnailsrc} alt="Thumbnail" width="80%" />
            }
            width="100%"
            onError={(e) => console.error("Video error:", e)}
          />
        </div>
        {/* title div */}
        <div className="border-2 border-white  w-full mt-0 overflow-y-auto h-32 rounded-lg">
          <h1 className="underline text-cyan-400 decoration-white font-bold text-3xl pl-10">
            {episodename}
          </h1>
          <h2 className="text-White font-bold text-lg pl-8">
            Episode&nbsp;:&nbsp;<span>{episodeno}</span>
          </h2>
          <h3 className="text-White font-bold text-lg pl-8">
            {episodedesc}
          </h3>
          
        </div>
      </div>
    </>
  );
};
export default VideoDiv;
