import React, { useState } from 'react';
import { Button, Select, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';


export default function Create() {
   
    let history = useHistory();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescrip] = useState('');
    const postData = () => {
        axios.post(`/insert`, {
            title,
            date,
            description
        }).then((res) => {
            console.log(res)
           
        })
    }
    return (
        <div>
            <Form className="create-form">
            <label>Add Film Node</label>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Released In</label>
                    <input placeholder='Date de réalisation' onChange={(e) => setDate(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Description' onChange={(e) => setDescrip(e.target.value)}/>
                </Form.Field>
               
                <Button onClick={postData} type='submit'>Add Movie</Button>
            </Form>
        </div>
    )
}
