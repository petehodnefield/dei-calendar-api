import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import './index.css';
import App from './pages/App';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Home />} /> */}
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
