import { UserProfile } from '../../models/user-profile';
import Enum from '../../utils/enum';
import { typedAction } from '../typed-action';

export const TodoListActionEnum = {
  SET_TODO_LIST: 'todo-list/SET_TODO_LIST',
  RESET: 'RESET',
} as const;

export type TodoListActionEnum = Enum<typeof TodoListActionEnum>;
type DataType = { name: string; age: number }

function setTodo(data: DataType) {
  return typedAction(TodoListActionEnum.SET_TODO_LIST, data);
}

export type TodoListActionTypes =
  | ReturnType<typeof setTodo>
  | { type: typeof TodoListActionEnum.RESET };

export default { setTodo };
