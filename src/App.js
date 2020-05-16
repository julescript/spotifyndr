import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './routes/Landing/Landing'

function App() {
  return (
    <Switch>
      <Route path='/' exact component={Landing}/>
    </Switch>
  );
}

export default App;
