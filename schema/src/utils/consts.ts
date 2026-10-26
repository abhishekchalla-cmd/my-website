export const IS_MULTI = {
  TRUE: true,
  FALSE: false,
} as const;

export type IsMulti = (typeof IS_MULTI)[keyof typeof IS_MULTI];
