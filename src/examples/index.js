import React from 'react';
import Helmet from 'react-helmet';
import s from '../css/examples.css';

const Prism = require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-jsx');

const examples = ['showTouchHint', 'loopForever', 'uncutPages', 'flipOnTouch'];

const renderExample = example => {
  const code = Prism.highlight(require(`./codes/${example}.txt`), Prism.languages.jsx);
  const component = (require(`./${example}`).default)();

  return (
    <div>
      <h2>{example}</h2>
      <div className={s.example} key={`example-${example}`}>
        <div className={s.code}>
            <pre className="language-jsx">
              <code className="language-jsx" dangerouslySetInnerHTML={{__html: code}} />
            </pre>
        </div>
        <div className={s.result}>
          {component}
        </div>
      </div>
    </div>
  );
};

const ExamplesPage = () => (
  <div>
    <Helmet title="Examples" />

    <style dangerouslySetInnerHTML={{__html: `
      .rfp-touchZone {
        background-color: rgba(255,255,255,0.25);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }
      .rfp-touchZone:hover {
        opacity: 1;
      }
    `}}
    />

    <section className="container">
      <h1>Examples</h1>

      {examples.map(renderExample)}
    </section>
  </div>
);

export default ExamplesPage;
