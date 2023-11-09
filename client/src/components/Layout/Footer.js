import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer p-0 m-0 ">
      <h6 className="text-center m-1 p-1 mt-2">
        All Right Reserved &copy; Malik Arslan Asif
      </h6>
      <p className="text-center p-0 mb-0">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
