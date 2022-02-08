import React, { useState } from 'react';
import { Button, Select, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
    let history = useHistory();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [relation, setRelation] = useState('');
    console.log(relation);
    const relationType = [
        { key: 'ACTED_IN', value: 'ACTED_IN', text: 'ACTED_IN' },
        { key: 'DIRECTED', value: 'DIRECTED', text: 'DIRECTED' },
        { key: 'FOLLOWS', value: 'FOLLOWS', text: 'FOLLOWS' },
        { key: 'PRODUCED', value: 'PRODUCED', text: 'PRODUCED' },
        { key: 'REVIEWED', value: 'REVIEWED', text: 'REVIEWED' },
        { key: 'WROTE', value: 'WROTE', text: 'WROTE' },
      ]

    const postData = () => {
        axios.post(`/addRelation`, {
            name,
            title,
            relation
        }).then((res) => {
            console.log(res)
          
        })
    }
    return (
        <div className="home">
            <Form className="create-form">
            <label>Add Relation </label>
                <Form.Field>
                    <label>Title of Movie</label>
                    <input placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Name of Person</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Relation Type</label>
                    <Select placeholder='Select your relation' options={relationType}  onChange={(e) => setRelation(e.target.textContent)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Add Relation</Button>
            </Form>
        </div>
    )
}
