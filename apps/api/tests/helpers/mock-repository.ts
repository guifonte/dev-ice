import { Repository } from 'typeorm';
import { mockId } from '.';

// prettier-ignore
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;// eslint-disable-line @typescript-eslint/ban-types
};

// prettier-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() =>({ // eslint-disable-line @typescript-eslint/no-explicit-any
  find: jest.fn(),
  save: jest.fn(entity => ({id: mockId(), ...entity})),
  delete: jest.fn(),
  create: jest.fn(entity => entity),
}))
