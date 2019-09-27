import React, { Component } from 'react';
import './App.css';
import serialijse from "serialijse";

class App extends Component {
  constructor (props) {
    super(props);

    const name = {
      firstName: 'Dev'
    }

    const sName = JSON.stringify(name)
    this.state = {
      name,
      sName
    }

  }

  componentDidMount() {
    this.component.addEventListener('greet', this.onGreetSubmit)
  }

  componentWillUnmount() {
    this.component.removeEventListener('greet', this.onGreetSubmit)
  }

  onGreetSubmit = (e) => {
    const firstName = e.srcElement.querySelector('#first-name').value
    const componentName = e.srcElement.querySelector('#the-component').value

    console.log(`${firstName} - ${componentName}`)


    const name = {
      ...this.state.name,
      firstName
    }

    const sName = serialijse.serialize(name)
    console.log('sName', typeof sName, sName)

    this.setState({
      name: {
        ...this.state.name,
        firstName
      },
      sName
    })


  }

  handleRef = (component) => {
    this.component = component
  }

  render() {

    const { name, sName }= this.state

    return (
        <div className="App">
          <header className="App-header">
            <p>
              Angular in React app
            </p>

            <tastic-greet name={this.state.sName} ref={this.handleRef}></tastic-greet>
          </header>
        </div>
    );
  }

}

export default App;
