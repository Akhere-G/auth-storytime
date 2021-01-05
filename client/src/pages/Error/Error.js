import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className='section'>
      <h2>Page Not Found</h2>
      <section className='card'>
        <p className='mb-1'>This page doesn't exist. Do you want to go back?</p>
        <Link to='/' className='btn btn-primary'>
          Go back
        </Link>
      </section>
    </div>
  );
};

export default Error;
