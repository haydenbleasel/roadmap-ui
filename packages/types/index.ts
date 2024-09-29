export interface Status {
  id: string;
  name: string;
  color: string;
}

export interface Feature {
  id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  status: Status;
}

export interface Marker {
  id: string;
  date: Date;
  label: string;
  backgroundColor: string;
  textColor: string;
}
