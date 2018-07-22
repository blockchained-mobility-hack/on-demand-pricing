import React from 'react';

export default class SelectTripActions extends React.PureComponent {
  public render() {
    return (
      <div className="SelectTripActions">
        <button>Stop Trip</button>
        <button>Alternative Route</button>
        <button>Report Interruption</button>
      </div>
    )
  }
}