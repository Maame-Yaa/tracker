import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      {/* The Router component enables the navigation between different components based on the URL path. It's like setting up signposts for where to go. */}
      <Router>
        {/* The Header component is displayed at the top of every page. Think of it as a constant header section across your application. */}
        <Header />
        {/* The Routes component holds all the different Route configurations. It decides which component to show based on the current URL. */}
        <Routes>
          {/* A Route specifies a path and the component to render at that path. In this case, when the URL is '/', it will display the Home component. */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
