import React from 'react';
import Helmet from 'react-helmet';

const disclaimer = `
DISCLAIMER: This package is in no way related to nor endorsed by Flipboard, Inc. nor flipboard.com.
This is just a showcase of HTML5 & CSS3 effect implemented with React.
`;

const home = [
  `React Flip Page aims at producing a Flipboard® -like effect with page flips.`,
  `Over the time it has acquired more features that you will discover in the docs or examples.`,
];

const gettingStarted = [
  `First of all, you must install the React Flip Page package. It is available on
  <a href="https://www.npmjs.com/package/react-flip-page">NPM</a>,
  but you can also use Yarn to install it.`,
  `Then you should use a bundler of your choice (webpack, rollup&hellip;) to add
  React Flip Page to your project.`,
];

const renderPs = ps => (
  ps.map((p, key) =>
    <p
      key={key}
      dangerouslySetInnerHTML={{__html: p}}
    />
  )
);

const HomePage = ({ renderer }) => {
  return (
    <div>
      <Helmet title="Home" />

      <section className="container">
        <h1>React Flip Page homepage</h1>

        <div className="alert alert-info">
          <em>
            {disclaimer}
          </em>
        </div>

        {renderPs(home)}

        <h2>Getting started</h2>

        {renderPs(gettingStarted)}
      </section>
    </div>
  );
};

export default HomePage;
