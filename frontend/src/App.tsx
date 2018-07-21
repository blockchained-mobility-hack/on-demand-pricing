import * as React from 'react';
import './App.css';
import SelectDestination from './components/SelectDestination'

import logo from './logo.svg';

type Screen = 'SelectDestination' | 'SelectItinerary';

class App extends React.Component {
  public state: {
    activeScreen: Screen;
    time?: number;
  };
  public props: {};
  constructor(props: {}) {
    super(props);
    this.state = { activeScreen: 'SelectDestination' };
    this.setDate = this.setDate.bind(this);
  }

  public setDate(timestamp: number) {
    this.setState({
      activeScreen: 'SelectItinerary',
      time: timestamp,
    });
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          Get started.
        </p>
        <SelectDestination setDate={this.setDate}/>
      </div>
    );
  }
}

export default App;
