import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from "./component/Home";
import About from "./component/About";
import NoteState from './Context/Note/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
