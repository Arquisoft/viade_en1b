import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export const Footer = () => {

    return (
        <div data-testid = "footer" id="footer">
            <div data-testid="footer-dev" className="footerElement"><b>Dev team: </b> Viade_en1b </div>
            <div data-testid="footer-github" className="footerElement"><a href="https://github.com/Arquisoft/viade_en1b"><FontAwesomeIcon id="githubIcon" icon={faGithub} /></a></div>
            <div data-testid="footer-react" className="footerElement"><a href="https://reactjs.org/"><FontAwesomeIcon id="githubIcon" icon={faReact} /></a></div>
        </div>
    );
};

export default Footer;
