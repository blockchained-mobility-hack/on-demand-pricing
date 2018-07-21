import * as React from 'react';
import './App.css';
import SelectDestination from './components/SelectDestination'

import logo from './logo.svg';

type Screen = 'SelectDestination' | 'SelectItinerary';
export interface IDestination {
  time: number,
  flexibility: number,
  classType: '1' | '2',
}
class App extends React.Component {
  public state: {
    activeScreen: Screen;
    time?: number;
  };
  public props: {};
  constructor(props: {}) {
    super(props);
    this.state = { activeScreen: 'SelectDestination' };
    this.setDestination = this.setDestination.bind(this);
  }

  public setDestination(destination: IDestination) {
    this.setState({
      activeScreen: 'SelectItinerary',
      destination,
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
        <SelectDestination setDestination={this.setDestination}/>
      </div>
    );
  }
}

export default App;
