import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../components/Home';
import { TodoContext } from '../context';
import * as LocalAuthentication from 'expo-local-authentication';

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  authenticateAsync: jest.fn(),
}));

// Mock the global alert function because it's not available in jest
global.alert = jest.fn();
describe('Home Component', () => {
  const mockAddTodo = jest.fn();
  const mockEditTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockSetAuthenticated = jest.fn();

  const renderWithContext = (authenticated = false, todos = []) =>
    render(
      <TodoContext.Provider
        value={{
          todos,
          addTodo: mockAddTodo,
          editTodo: mockEditTodo,
          deleteTodo: mockDeleteTodo,
          isAuthenticated: authenticated,
          setAuthenticated: mockSetAuthenticated,
        }}
      >
        <Home />
      </TodoContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should add a new todo if authenticated', () => {
    const { getByText, getByPlaceholderText } = renderWithContext(true);

    fireEvent.changeText(getByPlaceholderText('Enter a task...'), 'New Task');
    fireEvent.press(getByText('Add'));

    expect(mockAddTodo).toHaveBeenCalledWith('New Task');
  });

  test('should show authentication modal if unauthenticated', () => {
    const { getByText } = renderWithContext(false);

    fireEvent.press(getByText('Add'));

    expect(getByText('Unlock App')).toBeTruthy();
    expect(mockAddTodo).not.toHaveBeenCalled();
  });


  test('should authenticate user via biometric authentication', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    const { getByText } = renderWithContext(false);

    fireEvent.press(getByText('Unlock'));

    await waitFor(() => expect(LocalAuthentication.authenticateAsync).toHaveBeenCalled());
    expect(mockSetAuthenticated).toHaveBeenCalledWith(true);
  });

  test('should handle failed authentication', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: false });

    const { getByText } = renderWithContext(false);

    fireEvent.press(getByText('Unlock'));

    await waitFor(() => expect(LocalAuthentication.authenticateAsync).toHaveBeenCalled());
    expect(mockSetAuthenticated).not.toHaveBeenCalled();
  });
});


//NOTE: I haven't added tests for edit and delete because it requires some more time to mock the animation of the swipe out component