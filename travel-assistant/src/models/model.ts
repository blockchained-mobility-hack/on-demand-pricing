export type GoalType = {
  location: string;
  timestamp: Date;
  metadata: any;
};

export type TripSuggeston = {
  location: string;
  timestamp: number;
  provider: ServiceProvider;
};

export type ServiceProvider = {
  id: string;
  name: string;
  metadata: any;
}

export class Goal implements GoalType {
  location: string;
  metadata: any;
  timestamp: Date;

  constructor(location: string, timestamp: Date) {
    this.location = location;
    this.timestamp = timestamp;
  }
}

export type EventType = {
  id: string;
  name: string;
  type: Event;
  metadata: any;
}

export enum Event  {
  START_TRIP,
  END_TRIP,
  SWITCH_PROVIDER,
  STATUS,
  DISTORT
}



