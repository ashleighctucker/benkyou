import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import './Footer.css';

const Footer = () => {
  return (
    <div id="footer-container">
      <div id="footer-link-container">
        <div id="gh-icon">
          <a
            href="https://github.com/ashleighctucker"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </div>
        <div id="li-icon">
          <a
            href="https://www.linkedin.com/in/ashleighctucker/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
        </div>
        <span id="made-by">勉強 by Ash Tucker</span>
      </div>
    </div>
  );
};

export default Footer;
