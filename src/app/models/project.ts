import { Activity } from './activity';

export interface Project {
  _id?: string;
  title?: string;
  dateCreated?: string;
  personCreated?: string;
  priority?: number;
  status?: number;
  activities?: Activity[];
}
