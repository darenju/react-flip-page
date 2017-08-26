import React from 'react';
import Helmet from 'react-helmet';
import FlipPage from 'react-flip-page';
import s from './styles/ExamplesPage.css';

const baseUrl = 'http://unsplash.it/320/480/?image=';
const images = [434, 428, 413, 400];

const theEnd = <div className={s.theEnd}>The End!</div>;

const ExamplesPage = () => (
  <div>
    <Helmet title="Examples" />

    <section className="container">
      <h1>Examples</h1>

      <FlipPage showTouchHint lastComponent={theEnd}>
        {images.map((n, i) => <img key={i} src={`${baseUrl}${n}`} />)}
      </FlipPage>
    </section>
  </div>
);

export default ExamplesPage;
