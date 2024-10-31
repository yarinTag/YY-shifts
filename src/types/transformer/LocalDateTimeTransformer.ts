import {convert, LocalDateTime} from '@js-joda/core';
import {ValueTransformer} from 'typeorm';

export default class LocalDateTimeTransformer implements ValueTransformer {
  to(value: LocalDateTime): Date | null {
    return value ? convert(value).toDate() : null; // Convert LocalDateTime to Date for the database
  }

  from(value: Date): LocalDateTime | null {
    return value ? LocalDateTime.parse(value.toString()) : null; // Convert Date from the database to LocalDateTime
  }
}
