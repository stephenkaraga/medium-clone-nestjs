import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class BackendValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToInstance(metadata.metatype, value);
        const errors = await validate(object);

        if (errors.length === 0) {
            return value;
        }

        throw new HttpException({ errors: this.formatErrors(errors) }, HttpStatus.UNPROCESSABLE_ENTITY)
    }


    formatErrors(errors: ValidationError[]) {
        return errors.reduce((acc, err) => {
            acc[err.property] = Object.values(err.constraints);
            return acc;
        }, {});
    }
}