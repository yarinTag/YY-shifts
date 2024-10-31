import {convert, Instant, LocalDateTime} from '@js-joda/core';
import {ValueTransformer} from 'typeorm';

export default class LocalDateTimeTransformer implements ValueTransformer {
    to(localDateTime: LocalDateTime): Date | null {
        return localDateTime ? convert(localDateTime).toDate() : null; // Convert LocalDateTime to Date for the database
    }

    from(date: Date): LocalDateTime | null {
        return date ? LocalDateTime.ofInstant(Instant.ofEpochMilli(date.getTime())) : null; // Convert Date from the database to LocalDateTime
    }
}
