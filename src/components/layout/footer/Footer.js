import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
export default function Footer() {
	
	return (
        <div id="footer">
            <div className="footerElement"><b>Dev team: </b> Viade_en1b </div>
            <div className="footerElement"><a href="https://github.com/Arquisoft/viade_en1b"><FontAwesomeIcon id="githubIcon" icon={faGithub} /></a></div>
            <div className="footerElement"><a href="https://reactjs.org/"><FontAwesomeIcon id="githubIcon" icon={faReact} /></a></div>
	</div>
	)
}
