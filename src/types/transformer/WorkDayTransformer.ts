import { ValueTransformer } from 'typeorm';
import { WorkDay } from '../enum/workDay';

export default class WorkDayTransformer implements ValueTransformer {
  // class to DB
  to(value: WorkDay): number | null {
    return value !== null && value !== undefined ? value : null; // Convert WorkDay to number for the database
  }
  // DB To class
  from(value: number): WorkDay | null {
    if (value === null || value === undefined) {
      return null; // Handle null or undefined case
    }

    const foundDay = Object.values(WorkDay).find((day) => day === value);
    return foundDay !== undefined ? (foundDay as WorkDay) : null; // Explicitly cast or return null
  }
}
