import { LocalDate } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';

export default class LocalDateTransformer implements ValueTransformer {
  to(value: LocalDate): string | null {
    return value ? value.toString() : null; // Convert LocalDate to string for the database
  }

  from(value: string): LocalDate | null {
    return value ? LocalDate.parse(value) : null; // Convert string from the database to LocalDate
  }
}
