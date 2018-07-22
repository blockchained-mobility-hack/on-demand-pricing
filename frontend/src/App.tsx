import * as React from 'react';
import './App.css';
import SelectDestination from './components/SelectDestination'
import SelectTrip from "./components/SelectTrip";
import SelectTripActions from "./components/SelectTripAction";

import logo from './logo.svg';

type Screen = 'SelectDestination' | 'SelectTrip' | 'SelectTripActions';
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
    this.setTrip = this.setTrip.bind(this);
  }

  public setDestination(destination: IDestination) {
    this.setState({
      activeScreen: 'SelectTrip',
      destination,
    });
  }

  public setTrip() {
    this.setState({
      activeScreen: 'SelectTripActions',
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
        { this.state.activeScreen === 'SelectDestination' &&
        <SelectDestination setDestination={this.setDestination}/> }
        { this.state.activeScreen === 'SelectTrip' &&
        <SelectTrip setTrip={this.setTrip}/> }
        { this.state.activeScreen === 'SelectTripActions' &&
        <SelectTripActions /> }
      </div>
    );
  }
}

export default App;
