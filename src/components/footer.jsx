
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import img from "../images/freehitlogo.webp"

const iconStyles = {
    transition: 'transform 0.3s ease',
};
  
const hoverStyles = {
    transform: 'rotate(360deg)',
};

const Footer = () => {
    const [email,setEmail] = useState('')
    const [isHovered,setIsHovered] = useState('')
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert("Subscribed to newsletter with email: " + email);
    }
    const handleChange = (e) =>{
        setEmail(e.target.value)
    }
    
    const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
    const [isMailtoHovered, setIsMailtoHovered] = useState(false);
    const [isTwitterHovered, setIsTwitterHovered] = useState(false);
    const [isGithubHovered, setIsGithubHovered] = useState(false);

    const handleMailtoMouseEnter = () => {
        setIsMailtoHovered(true);
    };

    const handleMailtoMouseLeave = () => {
        setIsMailtoHovered(false);
    };

    const handleGithubMouseEnter = () => {
        setIsGithubHovered(true);
    };

    const handleGithubMouseLeave = () => {
        setIsGithubHovered(false);
    };

    const handleTwitterMouseEnter = () => {
        setIsTwitterHovered(true);
    };

    const handleTwitterMouseLeave = () => {
        setIsTwitterHovered(false);
    };
    const handleLinkedinMouseEnter = () => {
      setIsLinkedinHovered(true)
    }
    const handleLinkedinMouseLeave = () => {
      setIsLinkedinHovered(false)
    }
  return (
    <div>
      <footer>
      <div className="footer-left">
        <div className="footer-column">
          <h4>Links</h4>
          <ul>
            <li><a href="https://free-hit.vercel.app/">Home</a></li>
            <li><a href="https://free-hit.vercel.app/about">About Us</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=all">All</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=remote">Remote Jobs</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=ai">AI</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=ethical">Ethical Hacking</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Features</h4>
          <ul>
            <li><a href="https://free-hit.vercel.app/?filters=resume">Resume Builder</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=movies">Movies & Series</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=extensions">Extensions</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=ui">UI Design</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=web">Frontend Tools</a></li>
            <li><a href="https://free-hit.vercel.app/?filters=tools">Useful Tools</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-right">
        <div className="newsletter">
          <div style={{display:"flex",justifyContent:"center"}}>
          {/* <img src={img} alt="freehitlogo"className='freehitlogo'/> */}
          <h2 style={{fontSize:20,color:"white",paddingLeft:"50px"}}>FREEHIT</h2>
          </div>
          <h3>Subscribe to Our Newsletter</h3>
          <p>Monthly digest of what's new and exciting from us.</p>
          <form id="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              id="email-input"
              onChange={handleChange}
              value={email}
            />
            <button type="submit" id="subscribe-button" onClick={handleSubscribe}>Subscribe</button>
          </form>
        </div>
        <hr />
        <div className="social-icons" >
            <a
                href="https://www.linkedin.com/in/jason-dsouza-130b421ba/"
                onMouseEnter={handleLinkedinMouseEnter}
                onMouseLeave={handleLinkedinMouseLeave}
            >
                <FontAwesomeIcon
                icon={faLinkedin}
                style={isLinkedinHovered ? { ...iconStyles, ...hoverStyles } : iconStyles}
                className="icon"
                />
            </a>
            <a
                href ="mailto:jasondsouza212@gmail.com"
                onMouseEnter={handleMailtoMouseEnter}
                onMouseLeave={handleMailtoMouseLeave}
            >
                <FontAwesomeIcon
                icon={faEnvelope}
                style={isMailtoHovered ? { ...iconStyles, ...hoverStyles } : iconStyles}
                className="icon"
                />
            </a>
            <a
                href="https://twitter.com/_Jason_Dsouza"
                onMouseEnter={handleTwitterMouseEnter}
                onMouseLeave={handleTwitterMouseLeave}
            >
                <FontAwesomeIcon
                icon={faTwitter}
                style={isTwitterHovered ? { ...iconStyles, ...hoverStyles } : iconStyles}
                className="icon"
                />
            </a>
            <a
                href="https://github.com/JasonDsouza212"
                onMouseEnter={handleGithubMouseEnter}
                onMouseLeave={handleGithubMouseLeave}
            >
                <FontAwesomeIcon
                icon={faGithub}
                style={isGithubHovered ? { ...iconStyles, ...hoverStyles } : iconStyles}
                className="icon"
                />
            </a>
        </div>

        <p className="footer-text">
          Copywrite &copy; 2023 Free-Hit<br />
          Maintained By JASON DSOUZA
        </p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
