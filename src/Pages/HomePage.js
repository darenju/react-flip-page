import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import s from './styles/HomePage.css';

const HomePage = () => (
  <div>
    <Helmet title="Home" />

    <section className="container">
      <h2>What is this?</h2>

      <p>React Flip Page is a component that allows you to mimic the Flipboard® page flip effect.</p>
      <p>It was made open source by <a href="https://www.github.com/darenju" target="_blank">@darenju</a> and with help of contributors.</p>

      <h2>How do I use it?</h2>

      <p>It is very simple to use React Flip Page. You can checkout the <Link to="/examples">examples</Link> page to see a few use cases.</p>
      <p>React Flip Page is available on <a href="https://www.npmjs.com/package/react-flip-page" target="_blank">NPM</a>, but you can use yarn to install it too.</p>

      <SyntaxHighlighter language='shell'>{`yarn add react-flip-page`}</SyntaxHighlighter>
    </section>
  </div>
);

export default HomePage;
