import {LocalTime} from '@js-joda/core';
import {ValueTransformer} from 'typeorm';

export default class LocalTimeTransformer implements ValueTransformer {
  to(value: LocalTime): string | null {
    return value ? value.toString() : null; // Convert LocalTime to String for the database
  }

  from(value: string): LocalTime | null {
    return value ? LocalTime.parse(value) : null; // Convert String from the database to LocalTime
  }
}
