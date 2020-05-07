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
  toggleTag: (title: string, currentDate: Date) => {},
  setDate: (newDate: Date) => {},
};

export const UserContext = createContext(initialState);

export const UserContextProvider = (props) => {
  const toggleTheme = () => {
    setState((state) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  };

  const toggleTag = (title: string, currentDate: Date) => {
    let temp = state.tags;
    if (temp.has(title)) {
      temp.delete(title);
    } else {
      temp.add(title);
    }
    updateBooks(temp, currentDate);
  };

  const setDate = (newDate: Date) => {
    console.log(newDate);
    updateBooks(state.tags, newDate);
  };

  const updateBooks = (tags: Set<any>, date: Date) => {
    var currentBooks = state.books;

    console.log(" DATE!!! = " + date);
    currentBooks = currentBooks.filter(
      (book) =>
        book.recommendDate.month === date.getMonth() &&
        book.recommendDate.year === date.getFullYear()
    );

    if (tags.size > 0) {
      currentBooks = currentBooks.filter((book: IBook) => {
        let commonTags = book.tags.filter((x) => tags.has(x));
        return commonTags.length > 0;
      });
    }

    setState((state) => ({
      ...state,
      currentDate: date,
      tags: tags,
      currentBooks: currentBooks,
    }));
  };

  let allTags = new Set();
  let dates = [];
  books.forEach((b) => {
    b.tags.forEach(allTags.add, allTags);
    dates.push(new Date(b.recommendDate.year, b.recommendDate.month));
  });

  let maxDate = new Date(Math.max.apply(null, dates));
  let minDate = new Date(Math.min.apply(null, dates));

  let currentBooks = books.filter(
    (book) =>
      book.recommendDate.month === maxDate.getMonth() &&
      book.recommendDate.year === maxDate.getFullYear()
  );

  const [state, setState] = React.useState({
    ...initialState,
    books: books,
    currentBooks: currentBooks,
    availableTags: Array.from(allTags),
    currentDate: maxDate,
    minDate: minDate,
    maxDate: new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0),
    toggleTheme: toggleTheme,
    toggleTag: toggleTag,
    setDate: setDate,
  });

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
