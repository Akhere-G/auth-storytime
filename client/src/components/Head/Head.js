import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        name='description'
        content='A social media app where users can make an account and share, create and add stories. Built
      using the MERN stack. Authentication via json web tokens. By Akhere Ihoeghinlan
      '
      />
      <meta name='author' content='Akhere Ihoeghinlan' />
      <meta
        name='keywords'
        content='HTML, CSS, JavaScript, Stories, Akhere, Ihoeghinlan, Mongoose, Express, React, Node'
      ></meta>
    </Helmet>
  );
};

export default Head;
