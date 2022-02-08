import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
    let history = useHistory();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    
    const postData = () => {
        axios.post(`/insertPerson`, {
            name,
            date,
        }).then((res) => {
            console.log(res)
          
        })
    }
    return (
        <div>
            <Form className="create-form">
            <label>Add Person Node</label>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Birthday</label>
                    <input placeholder='Birthday' onChange={(e) => setDate(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Add Person</Button>
            </Form>
        </div>
    )
}
