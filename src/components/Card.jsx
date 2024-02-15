import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";

const Card = ({
  title,
  animeid,
  writer,
  genere,
  year,
  numberofepisodes,
  description,
  rating,
  imgsource,
}) => {
  const history = useNavigate();
  
  
  function playButtonClicked() {
    console.log("play button click",animeid);
    history(`/AnimeVideos/${animeid}`);
  }
 
  return (
    <>
      {/* container for movie card */}
      <div className=" bg-slate-900 hover:bg-black hover:border-2 border-solid border-white w-full rounded-2xl p-10 m-5  flex flex-row">
        {/* coantainer 1 for image */}
        <div className="w-1/4">
          <img
            //animeimages/naruto.webp"
            src={imgsource}
            alt={title}
            className="border-2   w-full h-80 m-2"
          />
        </div>
        {/* conatianer 2 for details */}
        <div className=" w-5/6 m-2 flex flex-row pl-5">
          {/* text */}
          <div className=" w-3/4 p-3">
            <h1 className="text-White font-bold text-5xl">{title}</h1>
            <h2 className="text-White font-bold text-2xl underline decoration-red-600">
              &nbsp;&nbsp;&nbsp;&nbsp;{writer}
            </h2>
            <h2 className="text-White font-bold text-lg">
              Genere&nbsp;:&nbsp;<span>{genere}</span>
            </h2>
            <h2 className="text-White font-bold text-lg">
              Year&nbsp;:&nbsp;<span>{year}</span>
            </h2>
            <h2 className="text-White font-bold text-lg">
              Episodes&nbsp;:&nbsp;<span>{numberofepisodes}</span>
            </h2>
            <p className="text-White font-bold text-sm mt-3">{description}</p>
            <button
              className=" btn bg-transparent px-5  m-3 border-slate-300 rounded-lg border-2"
              onClick={playButtonClicked}
            >
              Play
            </button>
          </div>
          {/* star*/}
          <div className=" w-1/6 p-3 ">
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
