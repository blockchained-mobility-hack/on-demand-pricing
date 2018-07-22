import React from 'react';

export interface ITrip {
  tripID?: number;
  providerID?: number;
  ruleID?: number;
  from?: string;
  to?: string;
  price?: number;
  deperature_time?: string;
  arrivival_time?: string;
  elapsed_time?: number;
  metadata?: any;
  discount_rate?: number
}
export default class TripLine extends React.PureComponent {
  public props: { trip: ITrip; setTrip: () => void; }
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <div className="TripLine" style={ { marginBottom: 20}}>
        { this.renderLine() }
        <button onClick={this.props.setTrip}>Select Trip</button>
      </div>
    )
  }
  private renderLine(): any[] {
    const line: any[] = [];
    for(const [key, value] of Object.entries(this.props.trip)) {
      if (value) {
        line.push(
          <div key={key} className="lineItem" id={key} style={ { display: "flex", justifyContent: "center", margin: 5} }>
            <div style={ { marginRight: 10} }>{key}: </div>
            <div>{value}</div>
          </div>
        );
      }
    }
    return line;
  }
}