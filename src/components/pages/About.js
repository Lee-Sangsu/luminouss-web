import React, { useEffect } from "react";
import AboutMain from 'components/organisms/AboutMain';
import GlobalNav from "global/GlobalNav";



const About = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <>
    <GlobalNav isFirstPage={false} isNotHome={true} />
    <AboutMain />
    </>
  );
}

export default About;