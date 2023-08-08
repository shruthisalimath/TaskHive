import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Project from './pages/Project';
import AuthPage from './pages/AuthPage';

// Create an Apollo Client instance with JWT authentication headers
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage or your preferred storage mechanism
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Routes>
            <Route path='/' element={ <AuthPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects/:projectId" element={<Project />} />
            Add more routes as needed
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;