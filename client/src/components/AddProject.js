import React, { Component } from 'react'
import axios from 'axios';




export default class AddProject extends Component {

  state = {
    title: '',
    description: '',
    error: null
  }

  handleChange = e => {
    const { name, value } = e.target;
    /*  if (value.length < 8) {
       this.setState({
         error: 'String is not long enough'
       })
     } else { */
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { title, description } = this.state;
    axios.post('/api/projects', {
      title,
      description
    })
      .then(response => {
        this.setState({
          title: '',
          description: ''
        })
        //update the list of the list of projects . We want to trigger getData() in the Projects Component
        this.props.getData();
      })
  }




  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <label htmlFor="title">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        {/* {this.error && this.state.error} */}
        <button type='submit'> Add a project</button>
      </form>
    )
  }
}