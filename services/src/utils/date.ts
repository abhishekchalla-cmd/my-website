export const getDateOrNil = (dateString: string) =>
  dateString ? new Date(dateString) : undefined;
