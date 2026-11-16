export const getDateOrNil = (dateString: string | undefined) =>
  dateString ? new Date(dateString) : undefined;
