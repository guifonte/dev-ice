import { Entity, Repository } from 'typeorm';

// prettier-ignore
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;// eslint-disable-line @typescript-eslint/ban-types
};

// prettier-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() =>({ // eslint-disable-line @typescript-eslint/no-explicit-any
  find: jest.fn(),
  save: jest.fn(entity => ({id: 1, ...entity})),
  create: jest.fn(entity => entity)
}))
