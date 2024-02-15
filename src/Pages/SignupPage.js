import { useState } from "react";
import { Content } from "./LandingPage";
import styled from "styled-components";
import Header2 from "../components/Header2";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useCookies } from 'react-cookie';

// import $ from 'jquery';
const SignupPage = (props) => {
  const history = useNavigate();
  function backButtonClicked(){
    history("/");
  }
  //console.log("Rendering SignupPage");
  return (
    <>
    
    <div className=" flex justify-end p-5 rounded-lg">
        
        {/* back arraow*/}
        <button onClick={backButtonClicked}>
          <img src="/images/back-arrow.png" alt="Back" className="w-10" />
        </button>
      </div>

      <Content>
        <SignupFormContainer />
      </Content>
    </>
  );
};

const SignupFormContainer = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [email, setEmail] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const [cookies, setCookie] = useCookies(['username']);
  //usehistory
  const history = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const salt =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    let encrypass = CryptoJS.HmacSHA256(salt, pass).toString(CryptoJS.enc.Hex);
    let encrypass2 = CryptoJS.HmacSHA256(salt, pass2).toString(
      CryptoJS.enc.Hex
    );
    setCookie('username',uname,{path:'/'});
    const obj = { fname, lname, uname, encrypass, encrypass2, email, salt };
    const dataJson = JSON.stringify(obj);
    if (encrypass === encrypass2) {
      console.log("js password match",dataJson);
      // console.log(encrypass);
      // console.log(encrypass2);
    }

    try {
      const response = await fetch("http://localhost:8000/signup.php", {
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
        history("/OtpConfirmation");
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
  };

  return (
    <SignupForm className="bg-slate-900 shadow-2xl shadow-blue-800 rounded-3xl">
      <form onSubmit={handleSubmit}>
        <fieldset className="border border-blue-400 p-4">
          <legend className="text-2xl italic">AnimeFlix</legend>

          <label>First Name:</label>
          <input
            type="text"
            // calssName="disabled:opacity-75 placeholder:italic placeholder:text-slate-400 "
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm "
            placeholder="Enter your First Name."
            required
            value={fname}
            onChange={(event) => {
              setFname(event.target.value);
            }}
          />

          {/* <p>{fname}</p> */}
          <br />
          <br />

          <label>Last Name:</label>
          <input
            type="text"
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
            placeholder="Enter your Last Name."
            required
            value={lname}
            onChange={(event) => {
              setLname(event.target.value);
            }}
          />

          <br />
          <br />

          <label>Create User Name:</label>
          <input
            type="text"
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
            placeholder="Create A New UserName."
            required
            value={uname}
            onChange={(event) => {
              setUname(event.target.value);
            }}
          />

          <br />
          <br />

          <label>Create New Password:</label>
          <input
            type="password"
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
            placeholder="Create A New Password."
            required
            value={pass}
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />

          <br />
          <br />

          <label>Rewrite The Password:</label>
          <input
            type="password"
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
            placeholder="Confirm Password."
            required
            value={pass2}
            onChange={(event) => {
              setPass2(event.target.value);
            }}
          />

          <br />
          <br />

          <label>Email:</label>
          <input
            type="email"
            className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
            placeholder="Enter A Valid Email."
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p className="err-msg">{ErrMsg}</p>
          <br />
          <br />

          <input type="submit" value="Submit" className="loginbtn" />
        </fieldset>
      </form>
    </SignupForm>
  );
};

const SignupForm = styled.div`
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
  .loginbtn {
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

  .err-msg {
    color: green;
    font-style: italic;
    display: flex;
    justify-content: center;
  }
`;

export default SignupPage;
