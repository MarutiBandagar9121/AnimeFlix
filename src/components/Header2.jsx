import { useNavigate } from "react-router-dom";

const Header2 = ({back}) => {
  const history = useNavigate();
  function backButtonClicked(){
    history(back);
  }
  return (
    <>
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
      
    </>
  );
};

export default Header2;
