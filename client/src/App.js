import React from 'react';
import './App.css';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Just another fandom Blog</h4>
      </header>
      <section>
        <Users/>

      </section>
    </div>
  );
}

export default App;
