'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CreateNotebook from './testCreate';

const testPage = () => {

    async function fetchStudents() { 
        try {
          const response = await axios.get('/api/student'); // Assuming your API route is named students.js (or .ts)
          const data = response.data;
          console.log(data)
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      }

      async function fetchNotebooks() {
        try {
          const response =  await axios.get('/api/getNotebooks');
          const data = response.data;
          console.log(data)
        } catch (error) {
          console.error('Error fetching notebooksL: ', error);
        }
      }

    return (
        <div>
            <Button onClick={() => fetchNotebooks()}>Try GET api </Button>
            <CreateNotebook/>
        </div>
    )

}

export default testPage