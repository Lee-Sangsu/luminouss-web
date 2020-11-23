import React from "react";
import AboutMain from 'components/organisms/AboutMain';
import 'components/styles/AboutNav.css';
import { Link } from 'react-router-dom';

const About = () => {
  
  const onVisionClick = () => {
    var vision = document.getElementById('vision');
    var team = document.getElementById('team');
    var solution = document.getElementById('solution');
    vision.style.color = 'green';
    team.style.color = 'black';
    solution.style.color = 'black';
  };
  
  const onTeamClick = () => {
    var vision = document.getElementById('vision');
    var team = document.getElementById('team');
    var solution = document.getElementById('solution');
      
    vision.style.color = 'black';
    team.style.color = 'green';
    solution.style.color = 'black';
  };

  const onSolutionClick = () => {
    var vision = document.getElementById('vision');
    var team = document.getElementById('team');
    var solution = document.getElementById('solution');
      
    vision.style.color = 'black';
    team.style.color = 'black';
    solution.style.color = 'green';
  };

  return (
    <nav>
       <ul className="about-ul">
         <li className='list'>
          <Link to='/about-luminouss/main' id="vision" onClick={onVisionClick}> Vision&Mission </Link>
         </li>
         <li className='list'>
          <Link to='/about-luminouss/team' id="team" onClick={onTeamClick}> Team </Link>
         </li>
         <li className='list'>
          <Link to='/about-luminouss/solution' id="solution" onClick={onSolutionClick}> Solution </Link>
         </li>
       </ul>
       <AboutMain />
    </nav>
  );
}

export default About;