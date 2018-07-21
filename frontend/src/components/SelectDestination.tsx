import React, {FormEvent} from 'react';

export interface ISelectDestinationProps {
  setDate: (timestamp: number) => void;
}
export default class SelectDestination extends React.Component {
  public props: ISelectDestinationProps;
  constructor(props: ISelectDestinationProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  public render() {
    return (
      <div className="SelectDestination">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              City of Destination:
              <input type="text" name="city"/>
            </label>
          </div>
          <div>
            <label>
              Travel Date:
              <div>
                <label>
                  day:
                  <input type="text" name="day"/>
                </label>
              </div>
              <div>
                <label>
                  month:
                  <input type="text" name="month"/>
                </label>
              </div>
              <div>
                <label>
                  year:
                  <input type="text" name="year"/>
                </label>
              </div>
            </label>
          </div>
          <div>
            <label>
              Time of Arrival:
              <div>
                <label>
                  hour:
                  <input type="text" name="hours"/>
                </label>
              </div>
              <div>
                <label>
                  minutes:
                  <input type="text" name="minutes"/>
                </label>
              </div>
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
  private handleSubmit(event: FormEvent<HTMLFormElement>) {
    // tslint:disable no-string-literal
    const timestamp = new Date(
      parseInt(event.target['year'].value, 10),
      (parseInt(event.target['month'].value, 10) - 1),
      parseInt(event.target['day'].value, 10),
      parseInt(event.target['hours'].value, 10),
      parseInt(event.target['minutes'].value, 10),
    ).getTime();
    this.props.setDate(timestamp);
    event.preventDefault();
    // tslint:enable no-string-literal
  }
}