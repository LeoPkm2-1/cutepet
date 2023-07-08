export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction<T extends string, P extends any, C extends any>(
  type: T,
  payload: P,
  condition: C
): { type: T; payload: P; condition: C };

export function typedAction(type: string, payload?: any, condition?: any) {
  return { type, payload, condition };
}
