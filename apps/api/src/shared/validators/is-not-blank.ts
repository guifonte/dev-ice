import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export function IsNotBlank(validationOptions?: ValidationOptions) {
  // prettier-ignore
  return function (object: Object, propertyName: string) { // eslint-disable-line @typescript-eslint/ban-types

    registerDecorator({
      name: 'isNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value) {
          return typeof value === 'string' && value.trim().length > 0;
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            '$property muss not be empty or made of only whitespaces',
          validationOptions
        ),
      },
    });
  };
}
