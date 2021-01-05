import React from "react";
import { Head } from "../../components";

const About = () => {
  return (
    <section className='section'>
      <Head title='Storytime | About' />
      <h2>About</h2>
      <div className='card'>
        <p>
          A social media app where users can make an account and share, create,
          update and add stories. Built using the MERN stack. Authentication via
          json web tokens. By Akhere Ihoeghinlan
        </p>
      </div>
    </section>
  );
};

export default About;
