import React from "react";
import AboutMain from 'components/organisms/AboutMain';
import 'components/styles/AboutNav.css';
import { Link } from 'react-router-dom';
import OnSolutionClick from 'functions/NavigationFunctions/OnSolutionClick';
import OnTeamClick from 'functions/NavigationFunctions/OnTeamClick';
import OnVisionClick from 'functions/NavigationFunctions/OnVisionClick';


const About = () => {
    var vision = document.getElementById('vision');
    var team = document.getElementById('team');
    var solution = document.getElementById('solution');
      
    vision.style.color = 'green';
    team.style.color = 'black';
    solution.style.color = 'black';

  return (
    <>
    <nav>
       <ul className="about-ul">
         <li className='list'>
          <Link to='/about-luminouss' id="vision" onClick={OnVisionClick}> Vision&Mission </Link>
         </li>
         <li className='list'>
          <Link to='/about-luminouss-team' id="team" onClick={OnTeamClick}> Team </Link>
         </li>
         <li className='list'>
          <Link to='/about-luminouss-solution' id="solution" onClick={OnSolutionClick}> Solution </Link>
         </li>
       </ul>
    </nav>
    <AboutMain />
    </>
  );
}

export default About;