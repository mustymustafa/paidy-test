import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Todo {
  id: number;
  text: string;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  editTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
  isAuthenticated: boolean;
  setAuthenticated: (status: boolean) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [idCounter, setIdCounter] = useState<number>(1); // each item needs to be unique
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: idCounter, text }]);
    setIdCounter(idCounter + 1); // Increment ID for next item
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, isAuthenticated,
      setAuthenticated, }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export {TodoContext}
