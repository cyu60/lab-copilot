'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'

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

    return (
        <div>
            <Button onClick={() => fetchStudents()}>Try GET api </Button>
        </div>
    )

}

export default testPage