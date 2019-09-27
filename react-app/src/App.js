import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: {
        fistName: 'Dev'
      }
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

    this.setState({
      name: {
        ...this.state.name,
        firstName
      }
    })
  }

  handleRef = (component) => {
    this.component = component
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p>
              Angular in React app
            </p>

            <tastic-greet name={this.state.name} ref={this.handleRef}></tastic-greet>
          </header>
        </div>
    );
  }

}

export default App;
