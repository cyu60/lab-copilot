'use client'

import { FC, FormEvent, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Notelist } from '@prisma/client'

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/api/notelist/create?slug=${slug}`, { name });
            console.log('Notelist created:', response.data);

        } catch (error) {
            console.error('Error creating notelist:', error);
        }
    };

    const fetchNotelist = async () => {
        
        try {
            const response = await axios.get(`/api/getNotelists?slug=${slug}`);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching notelist:', error);
        }
    }

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
            <div>
                <Button onClick={() => fetchNotelist()}>Try GET Notelist api </Button>
            </div>
        </div>
    );
}

export default page