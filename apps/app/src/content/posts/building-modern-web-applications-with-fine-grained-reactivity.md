---
title: "Solid.js - Building Modern Web Applications with Fine-Grained Reactivity"
summary: "Solid.js uses fine-grained reactivity for blazing-fast web apps. Components render once, updates are pinpoint precise. Minimal overhead, maximal performance."
publishedAt: "11/05/2025"
---

## Introduction to Solid.js

Solid.js is a declarative JavaScript library for building user interfaces that leverages fine-grained reactivity to create fast, efficient web applications. With its unique approach to state management and rendering, Solid provides developers with powerful tools to build complex applications while maintaining excellent performance.

## Core Philosophy

Solid's architecture is built around the principle of fine-grained reactivity. This means the system tracks dependencies at the most granular level possible, ensuring that only the exact parts of your application that need to update actually do so.

## Key Concepts

### Signals: The Foundation of Reactivity

Signals are the basic unit of reactivity in Solid. They represent values that change over time and automatically notify their dependents when updated.

```jsx
import { createSignal, createEffect } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  // React to signal changes
  createEffect(() => {
    console.log('Current count:', count());
  });
  
  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  );
}
```
### Derived State with Memos

```jsx
function ShoppingCart() {
  const [items, setItems] = createSignal([]);
  
  const total = createMemo(() => 
    items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  
  const itemCount = createMemo(() => 
    items().reduce((count, item) => count + item.quantity, 0)
  );
  
  return (
    <div>
      <p>Items in cart: {itemCount()}</p>
      <p>Total: ${total().toFixed(2)}</p>
    </div>
  );
}
```

### Control Flow Primitives

Solid provides built-in control flow components that integrate seamlessly with its reactivity system:

```jsx
function UserProfile({ user }) {
  return (
    <div>
      <Show when={user} fallback={<div>Loading user data...</div>}>
        <div class="profile">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          
          <Switch fallback={<p>Select a section</p>}>
            <Match when={user.activeTab === 'posts'}>
              <UserPosts userId={user.id} />
            </Match>
            <Match when={user.activeTab === 'photos'}>
              <UserPhotos userId={user.id} />
            </Match>
            <Match when={user.activeTab === 'friends'}>
              <UserFriends userId={user.id} />
            </Match>
          </Switch>
        </div>
      </Show>
    </div>
  );
}
```

### Building Components

```jsx
function ProductCard(props) {
  const [quantity, setQuantity] = createSignal(1);
  const [isFavorite, setIsFavorite] = createSignal(false);
  
  const totalPrice = createMemo(() => 
    props.product.price * quantity()
  );
  
  const toggleFavorite = () => setIsFavorite(!isFavorite());
  
  return (
    <div class="product-card">
      <img src={props.product.image} alt={props.product.name} />
      <h3>{props.product.name}</h3>
      <p>{props.product.description}</p>
      
      <div class="price-section">
        <span class="price">${totalPrice().toFixed(2)}</span>
        <div class="quantity-controls">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
            -
          </button>
          <span>{quantity()}</span>
          <button onClick={() => setQuantity(q => q + 1)}>
            +
          </button>
        </div>
      </div>
      
      <button 
        class={isFavorite() ? 'favorite active' : 'favorite'}
        onClick={toggleFavorite}
      >
        {isFavorite() ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
```

### Lists and Dynamic Content

```jsx
function DataTable({ data, columns }) {
  const [sortBy, setSortBy] = createSignal('name');
  const [sortDirection, setSortDirection] = createSignal('asc');
  
  const sortedData = createMemo(() => {
    const sorted = [...data()];
    sorted.sort((a, b) => {
      const aVal = a[sortBy()];
      const bVal = b[sortBy()];
      
      if (aVal < bVal) return sortDirection() === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection() === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  });
  
  const handleSort = (column) => {
    if (sortBy() === column) {
      setSortDirection(direction => direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  return (
    <table>
      <thead>
        <tr>
          <For each={columns}>
            {(column) => (
              <th onClick={() => handleSort(column.key)}>
                {column.name}
                {sortBy() === column.key && (
                  <span>{sortDirection() === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            )}
          </For>
        </tr>
      </thead>
      <tbody>
        <For each={sortedData()}>
          {(item) => (
            <tr>
              <For each={columns}>
                {(column) => (
                  <td>{item[column.key]}</td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
```

### Managing Side Effects

```jsx
function ThemeManager() {
  const [theme, setTheme] = createSignal('light');
  
  // Effect runs when theme changes
  createEffect(() => {
    document.documentElement.setAttribute('data-theme', theme());
    localStorage.setItem('theme', theme());
  });
  
  // Cleanup function
  createEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 't') {
        setTheme(theme => theme === 'light' ? 'dark' : 'light');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup on component disposal
    return () => window.removeEventListener('keydown', handleKeyPress);
  });
  
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Switch to {theme() === 'light' ? 'dark' : 'light'} theme
    </button>
  );
}
```

### Using Stores for Nested Reactivity

```jsx
import { createStore } from 'solid-js/store';

function TodoApp() {
  const [state, setState] = createStore({
    todos: [],
    filter: 'all',
    newTodoText: ''
  });
  
  const addTodo = () => {
    if (state.newTodoText.trim()) {
      setState('todos', todos => [
        ...todos,
        {
          id: Date.now(),
          text: state.newTodoText,
          completed: false,
          createdAt: new Date()
        }
      ]);
      setState('newTodoText', '');
    }
  };
  
  const toggleTodo = (id) => {
    setState('todos', 
      todo => todo.id === id,
      'completed',
      completed => !completed
    );
  };
  
  const filteredTodos = createMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  });
  
  return (
    <div class="todo-app">
      <h1>Todo List</h1>
      
      <div class="add-todo">
        <input
          type="text"
          value={state.newTodoText}
          onInput={(e) => setState('newTodoText', e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <div class="filters">
        <button
          class={state.filter === 'all' ? 'active' : ''}
          onClick={() => setState('filter', 'all')}
        >
          All
        </button>
        <button
          class={state.filter === 'active' ? 'active' : ''}
          onClick={() => setState('filter', 'active')}
        >
          Active
        </button>
        <button
          class={state.filter === 'completed' ? 'active' : ''}
          onClick={() => setState('filter', 'completed')}
        >
          Completed
        </button>
      </div>
      
      <div class="todo-list">
        <For each={filteredTodos()}>
          {(todo) => (
            <div class="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span class={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
```

### Advaned Patterns: Custom Directives

```jsx
function clickOutside(el, accessor) {
  const onClick = (e) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener('click', onClick);
  
  return () => document.body.removeEventListener('click', onClick);
}

function DropdownMenu() {
  const [isOpen, setIsOpen] = createSignal(false);
  
  return (
    <div class="dropdown" use:clickOutside={() => setIsOpen(false)}>
      <button onClick={() => setIsOpen(!isOpen())}>
        Menu
      </button>
      <Show when={isOpen()}>
        <div class="dropdown-content">
          <a href="#">Profile</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </div>
      </Show>
    </div>
  );
}
```

## Benefits of Solid's Approach

- Predictable Updates: Only the exact dependencies of changed state update
- Excellent Performance: Minimal overhead with direct DOM manipulation
- Small Bundle Size: Efficient tree-shaking and minimal runtime
- Developer Experience: Intuitive API with strong TypeScript support
- Composition Friendly: Easy to compose and reuse reactive primitives

## Conclusion

Solid.js offers a unique and powerful approach to building web applications through its fine-grained reactivity system. By focusing on precise dependency tracking and efficient updates, it enables developers to create high-performance applications with clean, maintainable code.

The library's thoughtful design choices and comprehensive feature set make it an excellent choice for projects of any scale, from simple interactive widgets to complex single-page applications.

As you explore Solid.js, you'll discover a framework that prioritizes both developer experience and application performance, providing the tools needed to build modern, efficient web applications.