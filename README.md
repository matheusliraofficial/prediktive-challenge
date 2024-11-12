# Timeline Visualization Component

A React-based timeline visualization component that allows users to create, edit, and manage events on an interactive timeline.

## Time Spent

I spent approximately 5 hours on this assignment, broken down as follows:

- Initial setup and core timeline implementation: 30 minutes
- Event management and lane allocation: 2 hours
- UI/UX improvements and styling: 1 hour
- Testing and bug fixes: 1 hour
- Documentation and final polish: 30 minutes

## What I Like About the Implementation

1. **Efficient Lane Management**: The lane allocation algorithm efficiently arranges events to minimize vertical space while maintaining readability. The implementation in utils.ts ensures optimal use of vertical space while preventing event overlaps.

2. **Responsive Design**: The timeline scales smoothly across different screen sizes and zoom levels, with a clean and intuitive interface.

3. **Context-Based State Management**: Using React Context for state management keeps the code organized and makes it easy to share state between components without prop drilling.

4. **Comprehensive Testing**: The implementation includes unit tests for critical components, ensuring reliability and making future modifications safer.

## What I Would Change

1. **Performance Optimization**: For large datasets, I would implement virtualization to render only visible events, improving performance with many timeline items.

2. **Drag and Drop**: Add drag-and-drop functionality for event resizing and repositioning, making it more interactive.

3. **Accessibility**: Add more comprehensive keyboard navigation and ARIA attributes for better accessibility.

## Design Decisions

1. **Visual Design**: The design was inspired by popular project management tools like JIRA and Asana, focusing on clarity and usability.

2. **Component Structure**: The component hierarchy was designed to be modular and reusable, with clear separation of concerns:
   - Timeline container for overall layout
   - Individual event components
   - Modal for event creation/editing
   - Context menu for quick actions

3. **Styling Approach**: Used CSS Modules for scoped styling to prevent conflicts and maintain maintainable CSS. Each component has its own module file, ensuring styles remain isolated and specific to their components.

## Testing Strategy

The project implements comprehensive unit tests using Jest and React Testing Library, focusing on component functionality and user interactions. Key testing areas include:

1. **Component Tests**:
   - Timeline component tests verify rendering, zoom controls, and event display
   - Events Modal tests cover form validation and submission
   - Options Menu tests ensure context menu functionality
   - Create Events Button tests confirm modal interaction

2. **Context Tests**:
   - Events Context tests validate state management
   - Modal Context tests verify modal operations

3. **Utility Function Tests**:
   - Date parsing and manipulation functions
   - Lane allocation algorithm
   - Event positioning calculations

The testing configuration uses:
- Jest for test running and assertions
- React Testing Library for component testing
- User event simulation for interaction testing
- JSDOM for DOM environment simulation

If I had more time, I would add:

1. **Integration Tests**:
   - Test the interaction between timeline and modal components
   - Verify event creation, editing, and deletion flows
   - Test zoom functionality with different event densities

2. **End-to-End Tests**:
   - Complete user flows using Cypress or Playwright
   - Test across different browsers and screen sizes
   - Verify drag-and-drop functionality

3. **Performance Tests**:
   - Load testing with large datasets
   - Measure and optimize render times
   - Test memory usage with many events

4. **Accessibility Tests**:
   - Screen reader compatibility
   - Keyboard navigation
   - Color contrast and visibility

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

## Technologies Used

- Node 20.14.0
- React 17.0.2
- TypeScript 4.9.5
- Jest for testing
- React Testing Library for testing
- SCSS Modules for styling
- React Context for state management
- React Toastify for notifications
