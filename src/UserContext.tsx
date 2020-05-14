import React from "react";
import { createContext } from "react";
import { books } from "../pages/api/books";

//  Default State
const initialState = {
  books: [],
  currentBooks: [],
  availableTags: [],
  tags: new Set(),
  currentDate: new Date(),
  minDate: new Date(),
  maxDate: new Date(),
  darkMode: false,
  toggleTheme: () => {},
  toggleTag: (title: string, tags: Set<any>) => {},
  updateBooks: (newDate: Date) => {},
};

export const UserContext = createContext(initialState);

export const UserContextProvider = (props) => {
  // Get initial dark mode
  // Priority: Returning user's preference -> user's system settings -> default to light
  var initialDarkMode = false;
  React.useEffect(() => {
    let isReturningUser = "dark" in localStorage;
    let savedMode = JSON.parse(localStorage.getItem("dark"));
    if (isReturningUser) {
      initialDarkMode = savedMode;
    } else if (window.matchMedia) {
      initialDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
    }
    localStorage.setItem("dark", JSON.stringify(initialDarkMode));
    setState((state) => ({
      ...state,
      darkMode: initialDarkMode,
    }));
    console.log(initialDarkMode);
  }, []);

  //  ---- FUNCTION DEFENITIONS ----

  // Function to toggle theme
  const toggleTheme = () => {
    setState((state) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  };

  // Function to toggle tag off/on
  const toggleTag = (title: string, tags: Set<any>) => {
    let temp = new Set(tags);
    console.log(state.tags);
    if (temp.has(title)) {
      temp.delete(title);
    } else {
      temp.clear();
      temp.add(title);
    }

    setState((state) => ({
      ...state,
      tags: temp,
    }));
  };

  // Function to update books/tags in the grid when date changes
  const updateBooks = (date: Date) => {
    var currentBooks = state.books;
    var newTags = new Set();

    currentBooks = currentBooks.filter(
      (book) =>
        book.recommendDate.month === date.getMonth() &&
        book.recommendDate.year === date.getFullYear()
    );

    currentBooks.forEach((b) => {
      b.tags.forEach(newTags.add, newTags);
    });

    setState((state) => ({
      ...state,
      availableTags: Array.from(newTags),
      currentDate: date,
      tags: new Set(),
      currentBooks: currentBooks,
    }));
  };

  //  ---- FIRST LOAD THINGS ----
  let newTags = new Set();

  // Get all recommendation dates, pull out min and max dates
  let dates = [];
  books.forEach((b) => {
    dates.push(new Date(b.recommendDate.year, b.recommendDate.month));
  });

  let maxDate = new Date(Math.max.apply(null, dates));
  let minDate = new Date(Math.min.apply(null, dates));

  // Get all books for the latest (max) month's recommendations
  let currentBooks = books.filter(
    (book) =>
      book.recommendDate.month === maxDate.getMonth() &&
      book.recommendDate.year === maxDate.getFullYear()
  );

  // Get current month's tags
  currentBooks.forEach((b) => {
    b.tags.forEach(newTags.add, newTags);
  });

  // Initliaze state
  const [state, setState] = React.useState({
    ...initialState,
    books: books,
    currentBooks: currentBooks,
    availableTags: Array.from(newTags),
    currentDate: maxDate,
    minDate: minDate,
    maxDate: new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0),
    toggleTheme: toggleTheme,
    toggleTag: toggleTag,
    updateBooks: updateBooks,
    darkMode: initialDarkMode,
  });

  // Hook to update local storage when theme is toggled
  React.useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(state.darkMode));
    console.log("updating dark mode: " + JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
