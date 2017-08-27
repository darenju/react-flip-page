import React from 'react';
import Helmet from 'react-helmet';
import ShowTouchHint from './showTouchHint';

const ExamplesPage = () => (
  <div>
    <Helmet title="Examples" />

    <section className="container">
      <h1>Examples</h1>

      <ShowTouchHint />
    </section>
  </div>
);

export default ExamplesPage;
