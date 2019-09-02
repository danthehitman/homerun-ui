import React from 'react';
//import React, { useState } from 'react';
import {CardList, Form} from './card'
import './App.css';

const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook", id:1},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu", id:2},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook", id:3},
];

class App extends React.Component {
  state = {profiles: testData};
  addNewProfile = (profileData) => {
    this.setState(prevState => (
      {
        profiles: [...prevState.profiles, profileData],
      }
    ))
  }

	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles={this.state.profiles}/>
    	</div>
    );
  }	
}

export default App;
