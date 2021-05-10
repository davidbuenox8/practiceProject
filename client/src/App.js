
import './App.css';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import { Route } from 'react-router-dom';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <div className="App">

      <Navbar />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/:id" component={ProjectDetails} />


    </div>
  );
}

export default App;
