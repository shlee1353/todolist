import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TodoList from "./TodoList.js"
import CheckCookie from "./CookieCheck.js"

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="/cookie" component={CheckCookie} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;