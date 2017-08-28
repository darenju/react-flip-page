import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from './components/Header';
import Page from './components/Page';
import Examples from './examples';
import '!style-loader!css-loader!./css/global.css';
import toc from './toc';

const basename = process.env.NODE_ENV === 'production' ? '/react-flip-page' : '/';

const App = () => (
  <Router basename={basename}>
    <div>
      <Helmet titleTemplate="%s — React Flip Page" />
      <Header />

      {
        toc.map(({ url, title, file, exact = false }) =>
          <Route
            exact={exact}
            key={title.toLowerCase()}
            path={url}
            render={(props) => (
              <Page
                {...props}
                title={title}
                file={file}
              />
            )}
          />
        )
      }
      <Route path="/examples" component={Examples} />
    </div>
  </Router>
);

export default App;
