import {convert, LocalDate} from '@js-joda/core';
import {ValueTransformer} from 'typeorm';

export default class LocalDateTransformer implements ValueTransformer {
  to(value: LocalDate): Date | null {
    return value ? convert(value).toDate() : null; // Convert LocalDate to Date for the database
  }

  from(value: Date): LocalDate | null {
    return value ? LocalDate.parse(value.toString()) : null; // Convert Date from the database to LocalDate
  }
}
