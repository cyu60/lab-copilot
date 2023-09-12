'use client'

import { FC, useState } from 'react'
import axios from 'axios'

interface PageProps {
    params: {
        slug: string
    }
}

//can take in as a query (more useful for "get")

//call get NoteList to display all the notelists on the side (cache these probably)

//can just do longer routes to get actual notelists?

const page = ({ params }: PageProps) => {

    //get should take in a url query
    const { slug } = params

    const [name, setName] = useState('');

    const handleSubmit = async () => {
  
      try {
        const response = await axios.post(`/api/notelist?slug=${slug}`, {name});
        console.log('Notelist created:', response.data);
  
      } catch (error) {
        console.error('Error creating notelist:', error);
      }
    };

    return (
        <div>
            <h2>Create Notelist</h2>
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

export default page