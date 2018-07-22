import React from 'react';
import backupAllTripsJson from './backupAllTripsJson';
import {default as TripLine, ITrip} from "./TripLine";

export interface ISelectTripProps {
  setTrip: () => void;
}
export default class SelectTrip extends React.PureComponent {
  public props: ISelectTripProps;
  public state: {
    trips: ITrip[] | null;
  };
  constructor(props: any) {
    super(props);
    this.state = {trips: null};
  }
  public async componentDidMount() {
    let data;
    try {
      const response = await fetch('http://35.234.102.27:5000/get_all_trips');
      data = await response.json();
    } catch (e) {
      data = backupAllTripsJson;
    }
    const trips = [];
    for(const trip of Object.entries(data)) {
      // @ts-ignore: should be ok
      trips.push(trip[1]);
    }

    this.setState({ trips });
  }
  public render() {
    return (
      this.state.trips && <div className="SelectTrip">
        { this.renderLine() }
      </div>
    )
  }
  private renderLine(): any {
    if (!this.state.trips) {
      return null;
    }

    return this.state.trips.map(
      (trip) =>
      // @ts-ignore: should be ok
      (<TripLine key={trip.tripID} trip={trip} setTrip={this.props.setTrip}/>)
    );
  }
}