import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TodoList from "./TodoList/TodoList.js"
import PopUp from "./PopUp/PopUp.js"

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="/popup" component={PopUp} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;