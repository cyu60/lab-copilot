import axios from 'axios'
import React, { useState } from 'react';

function CreateNotebook() {
  const [name, setName] = useState('');

  const handleSubmit = async () => {

    try {
      const response = await axios.post('/api/notebook', {name});
      console.log('Notebook created:', response.data);

      // Optionally, you can reset the form or perform other actions here.
    } catch (error) {
      console.error('Error creating notebook:', error);
    }
  };

  return (
    <div>
      <h2>Create Notebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateNotebook;