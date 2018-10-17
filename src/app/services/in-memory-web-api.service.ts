import { InMemoryDbService } from "angular-in-memory-web-api";
import { Project } from "../models/project";
import { Resource } from "../models/resource";

export class InMemoryWebApiService implements InMemoryDbService {
  createDb() {
    const projects: Project[] = data.projects;
    const resources: Resource[] = data.resources;
    return { projects, resources };
  }
}

const data = {
  projects: [
    {
      id: 1,
      title: "Project Management App",
      dateCreated: "2018-04-24T19:16:37Z",
      personCreated: "khuram",
      priority: 1,
      status: 2,
      activities: [
        {
          id: 1,
          title: "Plan App",
          description: "Gather requirements and plan",
          dateCreated: "2018-04-24T19:16:37Z",
          resourceId: 1,
          hoursWorked: 0
        },
        {
          id: 2,
          title: "Design App",
          description: "Design the prototype",
          dateCreated: "2018-04-24T19:16:37Z",
          resourceId: 1,
          hoursWorked: 0
        },
        {
          id: 3,
          title: "Build App",
          description: "Application development",
          dateCreated: '2018-04-24T19:16:37Z',
          resourceId: 1,
          hoursWorked: 0
        },
        {
          id: 4,
          title: 'Test App',
          description: 'Perform testing',
          dateCreated: '2018-04-24T19:16:37Z',
          resourceId: 1,
          hoursWorked: 0
        }
      ]
    },
    {
      id: 2,
      title: 'Event Management App',
      dateCreated: '2018-04-24T19:16:37Z',
      personCreated: 'khuram',
      priority: 2,
      status: 3,
      activities: [
        {
          id: 5,
          title: 'Plan App',
          description: 'Gather requirements and plan',
          dateCreated: '2018-04-24T19:16:37Z',
          resourceId: 1,
          hoursWorked: 0
        },
        {
          id: 6,
          title: 'Design App',
          description: 'Design the prototype',
          dateCreated: '2018-04-24T19:16:37Z',
          resourceId: 1,
          hoursWorked: 0
        },
        {
          id: 7,
          title: 'Build App',
          description: 'Application development',
          dateCreated: '2018-04-24T19:16:37Z',
          resourceId: 1,
          hoursWorked: 0
        },
        {
          id: 8,
          title: 'Test App',
          description: 'Perform testing',
          dateCreated: '2018-04-24T19:16:37Z',
          resourceId: 1,
          hoursWorked: 0
        }
      ]
    }
  ],
  resources: [
    {
      id: 1,
      firstName: 'Khuram',
      lastName: 'Niaz',
      email: 'test@xyz.com',
      phone: 1234567890,
      designation: 'Product Manager',
      activityId: 1
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@xyz.com',
      phone: 1234567890,
      designation: 'Software Developer',
      activityId: 3
    },
    {
      id: 3,
      firstName: 'James',
      lastName: 'Bond',
      email: 'test@xyz.com',
      phone: 1234567890,
      designation: 'Test Engineer',
      activityId: 4
    },
    {
      id: 4,
      firstName: 'Lara',
      lastName: 'Croft',
      email: 'test@xyz.com',
      phone: 1234567890,
      designation: 'UI Designer',
      activityId: 2
    },
    {
      id: 5,
      firstName: 'Khuram',
      lastName: 'Niaz',
      email: 'test@xyz.com',
      phone: 1234567890,
      designation: 'Product Manager',
      activityId: 1
    },
    {
      id: 6,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@xyz.com',
      phone: 1234567890,
      designation: 'Product Manager',
      activityId: 1
    }
  ]
};
