

/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import {ADD_POST} from '../../utils/mutations';
import {QUERY_POSTS } from '../../utils/queries';
import styled from 'styled-components';

import panda3 from '../../assets/panda3.jpg';

const Form = styled.form`
        display: flex;
        justify-content: center;
        flex-flow: wrap row;
        background-color: #F7F6FE;
        height: 800px;
        width: 900px;
        padding: 20px;
        margin: 20px;
        border: solid 5px #455A30;
        `
const TextArea = styled.textarea`
        align-self: center;
        height: 500px;
        width: 700px;
        background-color: white;
        border: solid 3px #0C1117;
        font-family: monospace;
        font-size: 12px;
        color: #01050A;
        padding-left: 5px;
        margin: 10px;`

const Button = styled.button`
        height: 30px;
        width: 75px;
        border: solid 3px #455A30;
        background-color: 0C1117;
        font-family: monospace;
        font-size: 12px;
        color: white;
        align-self: center;
        margin: 10px;`

const PostForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    text: '',
    author: '',
  });

  const [addPost, { error}] = useMutation (ADD_POST, {
    refetchQueries: [
      QUERY_POSTS,
      'getPosts'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = addPost({
        variables: {...formState},
      });
      setFormState({
        title: '',
        text: '',
        author: ''
      })
    } catch (err) {
      console.error(err)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name] : value,
    })
    console.log("updated state", formState)
  }

  return (
    <div>
      <h3>Shoot out a Panda Thought</h3>
      <img src={panda3} />
      <form
      onSubmit={handleFormSubmit}>
        <div>
          <input
          name="title"
          placeholder="Post Title"
          value={formState.title}
          onChange={handleChange}>
          </input>
        </div>
        <div>
          <TextArea
          name="text"
          placeholder="Here's a thought..."
          value={formState.text}
          onChange={handleChange}>
          </TextArea>
        </div>
        <div>
          <input
          name="author"
          placeholder="Username"
          value={formState.author}
          onChange={handleChange}>
          </input>
        </div>
        <div>
          <Button type="submit">
              Add Post
          </Button>
        </div>
        { error && (
          <div>
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  )
}

export default PostForm;

