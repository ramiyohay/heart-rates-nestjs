import { BadRequestException } from '@nestjs/common';

// Utility function to validate and parse date range from query parameters
export function validateDateRange(start?: string, end?: string): { startDate?: Date, endDate?: Date } {
  const startDate = start ? new Date(start) : undefined;
  const endDate = end ? new Date(end) : undefined;

  if (start && isNaN(startDate!.getTime())) {
    throw new BadRequestException(`Invalid start date: ${start}`);
  }

  if (end && isNaN(endDate!.getTime())) {
    throw new BadRequestException(`Invalid end date: ${end}`);
  }

  if (startDate && endDate && startDate > endDate) {
    throw new BadRequestException('Start date cannot be after end date');
  }

  if (startDate && !endDate) {
    throw new BadRequestException('End date is required when start date is provided');
  }

  if (!startDate && endDate) {   
    throw new BadRequestException('Start date is required when end date is provided');
  }

  return { startDate, endDate };
}
