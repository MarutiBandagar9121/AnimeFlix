const EpisodeListItem = ({epino,epiname,buttonClicked,isSelected}) => {
  
  return (
    <div className={`border-2 border-white mx-4 my-2 rounded-3xl p-2 flex flex-row justify-between hover:bg-black hover:border-blue-500 ${isSelected ? 'bg-blue-400' : ''}`}>
      <h4 className="font-bold text-lg pl-3">
        {" "}
        {epino}&nbsp;&nbsp;{epiname}
      </h4>
      <button onClick={() => buttonClicked(epino)} className="px-2 m-1 border-2 border-white bg-transparent rounded-3xl hover:bg-white hover:text-black hover:border-blue-500 hover:border-4">
        Play
      </button>
      
    </div>
  );
};
export default EpisodeListItem;
