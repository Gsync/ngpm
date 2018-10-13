import { Activity } from './activity';

export interface Project {
  id: number;
  title?: string;
  dateCreated?: string;
  personCreated?: string;
  priority?: number;
  status?: number;
  activities?: Activity[];
}
