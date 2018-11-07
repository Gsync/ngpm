import { Activity } from './activity';

export interface Project {
  _id?: string;
  title?: string;
  dateCreated?: string;
  personCreated?: string;
  percentComplete?: number;
  priority?: number;
  status?: number;
  activities?: Activity[];
}
