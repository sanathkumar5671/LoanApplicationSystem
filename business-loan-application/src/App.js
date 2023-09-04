import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/ApplicationStart';
import LoanApplicationForm from './Components/LoanApplicationForm';
import LoanDecision from './Components/LoanDecision';
import './App.css';

const App = () => {
  return (
    <div className='App'>
    <Routes>
      <Route exact path='/' element={< Header />}></Route>
      <Route exact path='/LoanApplicationForm' element={< LoanApplicationForm />}></Route>
      <Route exact path='/LoanDecision' element={< LoanDecision />}></Route>
    </Routes>
    </div>
  );
};

export default App;
