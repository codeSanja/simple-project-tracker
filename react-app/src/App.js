import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.component.addEventListener('greet', this.onGreetSubmit)
  }

  componentWillUnmount() {
    this.component.removeEventListener('greet', this.onGreetSubmit)
  }

  onGreetSubmit = (e) => {
    // console.log('onGreetSubmit - ',e, e.srcElement.children)

    const name = e.srcElement.querySelector('#first-name').value
    const componentName = e.srcElement.querySelector('#the-component').value

    console.log(`${name} - ${componentName}`)
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

            <tastic-greet ref={this.handleRef}></tastic-greet>
          </header>
        </div>
    );
  }

}

export default App;
