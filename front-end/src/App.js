import React from 'react';
import './App.css';

// Components
import Header from './components/Header/Header'
import TaskList from './components/TodoList/TaskList'

function App() {
  return (
    <div className="App">
      <Header />
      <TaskList />
    </div>
  );
}

export default App;
