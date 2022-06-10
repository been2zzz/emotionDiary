import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// COMPONENTS
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <MyHeader
          headText={'App'}
          leftChild={<MyButton text={'back'} />}
          rightChild={<MyButton text={'right'} />}
        />
        <h2>App.js</h2>
        <MyButton
          text={'BUTTON'}
          onClick={() => alert('button click!')}
          type={'positive'}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
