export const isNullOrEmpty = (value: any): boolean =>
  !value || value.length === 0 || Object.keys(value).length === 0;
