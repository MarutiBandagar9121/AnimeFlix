import { useState } from "react";
import { Content } from "./LandingPage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import Header2 from "../components/Header2";
export default function OtpConfirmatiom() {
  return (
    <>
      <Header2 back="/SignupPage"/>
      <Content >
      <OtpForm />
      </Content>
    </>
  );
}

const OtpForm = () => {
    const[otp,setOtp]=useState("");
    const[usernameCookies]=useCookies(['username']);
    const [ErrMsg, setErrMsg] = useState("");
    const history = useNavigate();
    const handleOtpSubmission = async (event) => {
        event.preventDefault();
        let username=usernameCookies['username'];
        const obj = {otp,username};
        const dataJson = JSON.stringify(obj);

        try {
            const response = await fetch("http://localhost:8000/otpConfirmation.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: dataJson,
            });
      
            if (!response.ok) {
              console.log("network error",response.status);
              //addes line of code
              return;
            }
            console.log("Response is:",response)
            const d = await response.json();
            console.log(d);
            //console.log("i am here");
      
            if ("error" in d) {
              let emsg = d["error"];
              setErrMsg(emsg);
            }
            if ("success" in d) {
              let emsg = d["success"];
              setErrMsg(emsg);
              history("/LoginPage");
            }
          } catch (error) {
            console.log("Error....", error);
            //console.log("Raw Response:", response.text());
            if (error instanceof SyntaxError) {
              console.log("JSON parsing error");
            } else {
              console.log("Network error");
            }
          }
    }
  function backButtonClicked(){
    history("/");
  }
  return (
      <>
      <Otp className="bg-slate-900 shadow-2xl shadow-blue-800 rounded-3xl">
      <form onSubmit={handleOtpSubmission}>
        <fieldset className="border border-blue-400 p-4">
          <legend className="text-2xl">OTP</legend>
          <label>Enter OTP:</label>
          <input
            type="text"
            placeholder="Enter Received OTP."
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
            required
            value={otp}
            onChange={(event) => {
              setOtp(event.target.value);
            }}
          />
          <p className="err-msg">{ErrMsg}</p>
          <br />
          <br />
          <input type="submit" value="Proceed." className="proceedbtn" />
        </fieldset>
      </form>
      </Otp>
      </>
    
  );
};

const Otp = styled.div`
  //background-color: #191919;
  padding: 1rem;
  border-radius: 1rem;

  label {
    display: inline-block;
    width: 100px; /* Adjust the width based on your design */
    margin-right: 10px; /* Optional: Add some spacing between label and input */
  }

  input {
    display: inline-block;
    
  }

  @media only screen and (min-width: 700px) {
    width: 30rem;
  }

  .proceedbtn {
    background-color: transperent;
    padding: 0.8rem;
    border-radius: 1rem;
    border: 1px solid white;
    cursor: pointer;
    &:hover {
      color: black;
      background-color: blue;
      border: 1px solid blue;
    }
  }
  .msg {
    color: red;
    display: flex;
    justify-content: center;
  }
`;
