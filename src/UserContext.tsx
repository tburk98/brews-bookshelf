import React from "react";
import { createContext } from "react";
import { IBook } from "../@types/index";
import { books } from "../pages/api/books";

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
  const toggleTheme = () => {
    setState((state) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  };

  const toggleTag = (title: string, tags: Set<any>) => {
    let temp = new Set(tags);
    console.log(state.tags);
    if (temp.has(title)) {
      temp.delete(title);
    } else {
      temp.add(title);
    }

    setState((state) => ({
      ...state,
      tags: temp,
    }));
  };

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

  let newTags = new Set();
  let dates = [];
  books.forEach((b) => {
    dates.push(new Date(b.recommendDate.year, b.recommendDate.month));
  });

  let maxDate = new Date(Math.max.apply(null, dates));
  let minDate = new Date(Math.min.apply(null, dates));

  let currentBooks = books.filter(
    (book) =>
      book.recommendDate.month === maxDate.getMonth() &&
      book.recommendDate.year === maxDate.getFullYear()
  );

  currentBooks.forEach((b) => {
    b.tags.forEach(newTags.add, newTags);
  });

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
  });

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
