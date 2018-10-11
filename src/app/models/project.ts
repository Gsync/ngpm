import { Activity } from './activity';

export interface Project {
  id: number;
  title: string;
  dateCreated: Date;
  personCreated: string;
  priority: number;
  status: number;
  activities: Activity[];
}
