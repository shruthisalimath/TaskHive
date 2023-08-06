import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.css'

import Home from './pages/Home';
import Project from './pages/Project';
import AuthPage from './pages/AuthPage';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
          {/* <Home /> */}
          {/* if user is on project page, render project page */}
          <Router>
            <div className="flex-column justify-flex-start min-100-vh">
              <Routes>
                <Route 
                  path="/" 
                  element={<Home />} 
                />
                <Route 
                  path="/projects/:projectId" 
                  element={<Project />} 
                />
              </Routes>
            </div>
          </Router>
    </ApolloProvider>
  );
}

export default App;
