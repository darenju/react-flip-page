import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import DocsPage from './Pages/DocsPage';
import ExamplesPage from './Pages/ExamplesPage';
import '!style-loader!css-loader!./global.css';

const basename = process.env.NODE_ENV === 'production' ? '/react-flip-page' : '/';

const App = () => (
  <Router basename={basename}>
    <div>
      <Helmet titleTemplate="%s — React Flip Page" />
      <Header />

      <Route exact path="/" component={HomePage} />
      <Route path="/docs" component={DocsPage} />
      <Route path="/examples" component={ExamplesPage} />
    </div>
  </Router>
);

export default App;
