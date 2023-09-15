'use client'

import { FC, FormEvent, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

const page = () => {

  //get should take in a url query
  const params = useParams();

  const [content, setContent] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
          const response = await axios.post(`/api/note/create`, { content: content, notelistId: params.notelistId});
          console.log('Note created:', response.data);

      } catch (error) {
          console.error('Error creating note:', error);
      }
  };

  const fetchNotes = async () => {
      
    try {
        const response = await axios.get(`/api/getNotes?slug=${params.notelistId}`);
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching notelist:', error);
    }
    
}

  return (
      <div>
          <h2>Create Note</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Content:</label>
                  <input
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                  />
              </div>
              <button type="submit">Create</button>
          </form>
          <div>
                <Button onClick={() => fetchNotes()}>Try GET Notelist api </Button>
          </div>
      </div>
      
  );
}

export default page