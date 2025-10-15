import {FaGithub, FaLinkedin} from "react-icons/fa6";

const Socials = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://github.com/RnUrPl">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/renat-yurkevich/">
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  );
};

export default Socials;