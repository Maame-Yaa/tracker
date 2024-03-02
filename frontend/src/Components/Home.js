// Import the necessary tools and components from the libraries we are using
import React, { useState } from 'react'; // React library for building the user interface
import { Button } from 'react-bootstrap'; // Pre-styled button component from Bootstrap
import axios from 'axios'; // Library for making HTTP requests

// Define the Home component that will be used to display the home page
export default function Home() {
  // Create a state variable 'name' that will store whatever is typed into the text box
  const [name, setName] = useState('');

  // This function will be called when the 'Add' button is clicked
  const addName = () => {
    // Send a request to the server to add the name
    axios.post('http://localhost:2000/api/addName', { name: name })
      .then(response => {
        // If the server responds that it worked, show a message to the user
        alert(response.data.msg);
      })
      .catch(error => {
        // If there was a problem, log the error in the console for us to see
        console.error('There was an error!', error);
      });
  };

  // This is what our home page will look like
  return (
    <div>
      {/* This is a space above the text box */}
      <div style={{marginTop: '10px'}}></div>
      {/* The text box for typing in a name */}
      <input 
        type='text' 
        placeholder='Type a name here...' 
        onChange={(e) => setName(e.target.value)} // Update 'name' every time the text changes
        value={name} // Display the current value of 'name' in the text box
        className='searchtext' // Apply some pre-defined styles to the text box
      />
      {/* The 'Add' button that calls the addName function when clicked */}
      <Button 
        variant="dark" 
        className='searchbtn' 
        disabled={name === ""} // Disable the button if 'name' is empty
        onClick={addName} // Set up the button to call addName when it's clicked
      >
        Add
      </Button>
    </div>
  );
}
