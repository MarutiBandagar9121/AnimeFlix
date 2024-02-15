
import { Content } from "./LandingPage";
import Header2 from "../components/Header2";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const LoginPage = (props) => {
  const history = useNavigate();

  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [msgerr, setMsg] = useState("");
  

  const handleLogin = async (event) => {
    event.preventDefault();
    let salt;
    const data_obj_salt = { uname };
    const data_str_salt = JSON.stringify(data_obj_salt);

    try {
      const response = await fetch("http://localhost:8000/SigninSalt.php", {
        method: "POST",
        header: {
          "content-type": "application/json",
        },
        body: data_str_salt,
      });
      if (!response.ok) {
        console.log("Network Error");
      }
      const data_receive = await response.json();
      console.log(data_receive);
      if ("error" in data_receive) {
        let emsg = data_receive["error"];
        setMsg(emsg);
      }
      if ("success" in data_receive) {
        salt=data_receive["salt"];
      }
    } catch (error) {
      console.log("Error..", error);
    }
    let hashpass=CryptoJS.HmacSHA256(salt, pass).toString(CryptoJS.enc.Hex);
    const data_obj = { uname, hashpass };
    const data_str = JSON.stringify(data_obj);
    try {
      const response = await fetch("http://localhost:8000/signin.php", {
        method: "POST",
        header: {
          "content-type": "application/json",
        },
        body: data_str,
      });
      if (!response.ok) {
        console.log("Network Error");
      }
      const data_receive = await response.json();
      console.log(data_receive);
      if ("error" in data_receive) {
        let emsg = data_receive["error"];
        setMsg(emsg);
      }
      if ("success" in data_receive) {
        let emsg = data_receive["success"];
        setMsg(emsg);
        history("/AnimeList");
      }
    } catch (error) {
      console.log("Error..", error);
    }
  };

  return (
    <>
    <Header2 back="/"/>
    <Content>
      <LoginForm className="bg-slate-900 shadow-2xl shadow-blue-800 rounded-3xl">
        <form onSubmit={handleLogin}>
          <fieldset className="border border-blue-400 p-4">
            <legend className="text-2xl">Login</legend>
            <label>Enter User Name:</label>
            <input
              type="text"
              placeholder="Enter Your UserName."
              className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
              required
              value={uname}
              onChange={(event) => {
                setUname(event.target.value);
              }}
            />

            <br />
            <br />

            <label>Enter Password:</label>
            <input
              type="password"
              placeholder="Enter Your Password."
              className=" bg-transparent placeholder:italic placeholder:text-blue-50 block text-white w-3/5 border border-slate-300 rounded-lg py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm"
              required
              value={pass}
              onChange={(event) => {
                setPass(event.target.value);
              }}
            />

            <br />
            <p className="msg">{msgerr}</p>
            <br />
            <input type="submit" value="Login" className="loginbtn" />
          </fieldset>
        </form>
      </LoginForm>
    </Content>
    </>
  );
};

const LoginForm = styled.div`
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
  .msg {
    color: red;
    display: flex;
    justify-content: center;
  }
`;

export default LoginPage;
