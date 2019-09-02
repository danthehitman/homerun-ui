import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


const CardList = (props) => {
  return (
    <div>
      { props.profiles.map(profile => <Card key={profile.id} {...profile}/>) }
    </div>
  )
}

class Form extends React.Component {
  state = {userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`)
    this.props.onSubmit(resp.data);
    this.setState({userName:""});
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          value={this.state.userName} 
          onChange={event => this.setState({userName: event.target.value})}
          type="text" 
          placeholder="GitHub username" 
          required
        />
        <button>Add card</button>
      </form>
    )
  }
}

class Card extends React.Component {
	render() {
    const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} />
        <div className="github-profile-info">
          <div className="github-profile-name">{profile.name}</div>
          <div className="github-profile-company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

export {CardList, Form}