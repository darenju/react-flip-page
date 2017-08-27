import React from 'react';
import Helmet from 'react-helmet';

const Page = ({ title, file }) => (
  <div>
    <Helmet title={title} />

    <section
      className="container"
      dangerouslySetInnerHTML={{__html: require(`../markdown/${file}`)}}
    />
  </div>
);

export default Page;
