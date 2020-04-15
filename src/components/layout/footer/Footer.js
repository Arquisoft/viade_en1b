import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export const Footer = () => {

    return (
        <div data-testid = "footer" id="footer">
            <div className="footerElement"><b data-testid="footer-dev">Dev team: </b> Viade_en1b </div>
            <div className="footerElement"><a data-testid="footer-github"href="https://github.com/Arquisoft/viade_en1b"  target="_blank"><FontAwesomeIcon id="githubIcon" icon={faGithub} /></a></div>
            <div className="footerElement"><a data-testid="footer-react" href="https://lamasumas.github.io/Solid/" target="_blank"><FontAwesomeIcon id="githubIcon" icon={faBook} /></a></div>
            <div className="footerElement"><a data-testid="footer-react" href="https://reactjs.org/"  target="_blank"><FontAwesomeIcon id="githubIcon" icon={faReact} /></a></div>
        </div>
    );
};

export default Footer;
