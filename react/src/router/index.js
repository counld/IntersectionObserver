import React from 'react';
import { Switch, Route, Redirect, useRouteMatch, Link, useParams } from 'react-router-dom';
import routerMap from './routerMap';

function router() {
	return routerMap.map((item) => {
		return <Route key={item.path} path={item.path} exact component={item.componet} />
	})
}

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!" },
  { id: "q2", author: "Max", text: "Learning React is great!" },
];

const App = () => {
	const match = useRouteMatch();
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  // if (!quote) {
  //   return <p>No quote found!</p>;
  // }
	console.log(match,'match',quote);
	return (
			<Switch>
				<Redirect exact from="/" to="/home" />
				<Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
				{router()}
			</Switch>
	)
}

export default App;