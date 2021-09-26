import { Validator } from 'class-validator';
import { IsNotBlank } from '../src/shared/validators/is-not-blank';

const validator = new Validator();
describe('IsNotBlank custom validator', () => {
  class TestClass {
    @IsNotBlank()
    name: string;
  }

  it('if name is not empty then it should succeed', () => {
    const model = new TestClass();
    model.name = 'hello world';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toBe(0);
    });
  });

  it('if name is empty then it should fail', () => {
    const model = new TestClass();
    model.name = '';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        isNotBlank: 'name must not be empty or made of only whitespaces',
      });
    });
  });

  it('if name is only white space then it should fail', () => {
    const model = new TestClass();
    model.name = '     ';
    return validator.validate(model).then((errors) => {
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toEqual({
        isNotBlank: 'name must not be empty or made of only whitespaces',
      });
    });
  });
});
