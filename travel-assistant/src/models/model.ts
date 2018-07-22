export type GoalType = {
  fromLocation: string;
  toLocation: string;
  arrivalTime: Date;
  metadata: MetadataType;
};

export type MetadataType = {
  maxStops: number;
  timeFlexibility: number;
  serviceClass: number;
  // specific metadata
  metadata: any;
};

export type TripSuggestion = {
  location: string;
  timestamp: number;
  provider: ServiceProvider;
};

export type ServiceProvider = {
  id: string;
  name: string;
  metadata: MetadataType;
}

export class Goal implements GoalType {
  fromLocation: string;
  toLocation: string;
  metadata: any;
  arrivalTime: Date;
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
  DISRUPT
}
