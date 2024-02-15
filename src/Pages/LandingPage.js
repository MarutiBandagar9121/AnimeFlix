import styled from "styled-components";
import Header from "../components/Header";
import { Typewriter } from "react-simple-typewriter";
const LandingPage = (props) => {
  return (
    <Container>
      <Header />
      <Content>
        <CTA className="text-white drop-shadow-2xl  text-5xl">
          <h1>
            Life Is simple{" "}
            <span className="text-red-500 underline decoration-white decoration-solid">
            <Typewriter
              
              words={["Watch!", "Chill!", "Repeat!"]}
              loop={false}
              cursor={true}
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            </span>
          </h1>
        </CTA>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  // height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  flex-direction: column;
  padding: 80px 40px;
  height: 100%;

  background-image: url("/images/charactersBg.jpg");
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;
const CTA = styled.div``;
export default LandingPage;
export { Content };
