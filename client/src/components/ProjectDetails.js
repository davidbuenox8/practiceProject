import React, { Component } from 'react';
import axios from 'axios';
import EditProject from './EditProject'
export default class ProjectDetails extends Component {

  state = {
    project: null,
    title: '',
    description: '',
    error: null,
    editForm: false
  }

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm
    }))
  }

  getData = () => {
    axios.get(`/api/projects/${this.props.match.params.id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description
        })
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: 'Not found'
          })
        }
      })
  }

  deleteProject = () => {
    axios.delete(`/api/projects/${this.state.project._id}`)
      .then(() => {
        // we want to redirect to the projects list
        this.props.history.push('/projects');
      })
      .catch(err => console.log(err))
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    const { title, description } = this.state;
    e.preventDefault();
    axios.put(`/api/projects/${this.state.project._id}`, {
      title,
      description
    })
      .then(response => {
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
          editForm: false
        })
      })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.error) return <h2>{this.state.error}</h2>
    if (!this.state.project) return <h1>Loading...</h1>
    return (
      <div>
        <h1>Title: {this.state.project.title}</h1>
        <p>Description: {this.state.project.description}</p>
        <button onClick={this.deleteProject}>Delete this project</button>
        <button onClick={this.toggleEditForm}>Show Edit Form</button>
        {this.state.editForm && (
          //this passes all the state to edit object {...this.state}
          <EditProject {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit} />
        )}
      </div>
    )
  }
}
