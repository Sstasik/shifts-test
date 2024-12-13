# Employee Schedule Management

This project is built with **Next.js** and **TypeScript**. It provides an interactive interface to manage employees' shifts for a single week. Users can drag and drop shifts across days, navigate between weeks, and edit shift details through a dedicated form.

---

## Features

### 1. **Employee Schedule Table**

- Displays a weekly schedule with rows for employees and columns for days.
- Allows users to view and manage shifts in an intuitive grid layout.

### 2. **Drag and Drop Functionality**

- Shifts can be moved between days using **`react-dnd`** for drag-and-drop operations.

### 3. **Shift Editing**

- Clicking on a shift card opens an **Edit Menu**, where users can modify all shift details. The same action can be done if user open the context menu in the card and select the Edit button
- User can delete shift card with context menu and Delete button
- The form is built with **`react-hook-form`** for efficient state management and validation.

### 4. **Weekly Navigation**

- Users can navigate between weeks to manage shifts for past or upcoming schedules.

---

## Tech Stack

### **Frontend**

- **Next.js**: Framework for server-side rendering and routing.
- **TypeScript**: For strong typing and improved developer experience.
- **React**: Component-based architecture.
- **react-dnd**: Drag-and-drop functionality.
- **react-hook-form**: Lightweight and flexible form handling.
- **CSS Modules / Tailwind CSS (Optional)**: For styling components.

---

## Project Setup  

Follow these steps to set up and run the project locally.  

### 1. Open Your Terminal  
- If you're using Visual Studio Code, you can open the integrated terminal by pressing:  
  - Ctrl + ` on Windows  
  - Cmd + ` on macOS  

### 2. Start the Development Server  
- Run the following command in your terminal:  
  ```bash
  npm run dev
