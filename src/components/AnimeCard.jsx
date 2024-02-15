import styled from "styled-components";
import Card from "./Card";


const AnimeCard = ({ animes }) => {
  console.log("animelist", animes);
  return (
    <MovieCard>
      {/* Outer container with the bg image */}
      <div
        className="bg-cover bg-center h-screen flex flex-col"
        style={{ backgroundImage: "url('/images/aniBg.jpg')" }}
      >
        {/* container for the logo and search bar */}
        <div className="flex justify-between p-5">
          {/* logo image */}
          <img
            src="/images/animieFlix.png"
            className="w-40 drop-shadow-xl shadow-black bg-cover bg-center bg-gradient-to-t"
            alt="ANIMIE FLIX"
          />
          {/* search bar and user*/}
          <div className="flex flex-row justify-between align-middle">
          <form>
            <input
              type="text"
              className="mr-4 bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-40 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
              placeholder="Search."
            />
          </form>
          <img src="/images/man.png" className="w-14 ml-2"/>
          </div>
        </div>
        {/* border-4 border-yellow-300 border-solid  */}
        <div className=" mx-28 mt-5 flex-grow items-center justify-center  overflow-y-auto overflow-x-hidden webkit">
          {animes.map((anime, index) => (
            <Card
              animeid={animes[index].animeid}
              title={animes[index].title}
              writer={animes[index].writer}
              genere={animes[index].genere}
              year={animes[index].year}
              description={animes[index].description}
              numberofepisodes={animes[index].numberofepisodes}
              rating={animes[index].rating}
              imgsource={animes[index].imgsource}
            />
          ))}
        </div>
      </div>
    </MovieCard>
  );
};
const MovieCard = styled.div`
  .btn {
    &:hover {
      color: black;
      background-color: green;
      border: 1px solid black;
    }
  }
`;
export default AnimeCard;
