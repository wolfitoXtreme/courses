import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';
/*-------------------
before webpack optimization, 
these modules will be automatically loaded by webpack
import ArtistDetail from './components/artists/ArtistDetail';
import ArtistCreate from './components/artists/ArtistCreate';
import ArtistEdit from './components/artists/ArtistEdit';
-------------------*/

// Plane routes
/*-------------------
// defining routes as an object to later use
// code splitting with webpack
-------------------*/
const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: {
    component: ArtistMain
  },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        /*-------------------
        using System ES6 JS global variable to import a file/module
        webpack will deal with this for code splitting, one by one 
        System declaration in order to create the corresponding file parts,
        thus this cannot be written as a function with parameters or something... 
        -------------------*/
        System.import('./components/artists/ArtistCreate').then(
          (module) => {
            cb(null, module.default);
          }
        );
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail').then(
          (module) => {
            cb(null, module.default);
          }
        );
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit').then(
          (module) => {
            cb(null, module.default);
          }
        );
      }
    }
  ]
};

const Routes = () => {
  return (
    /*-------------------
    before webpack oprimization 
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={ArtistMain} />
        <Route path="artists/new" component={ArtistCreate} />
        <Route path="artists/:id" component={ArtistDetail} />
        <Route path="artists/:id/edit" component={ArtistEdit} />
      </Route>
    </Router>
    -------------------*/
    <Router history={hashHistory} routes={componentRoutes}/>
  );
};

export default Routes;
