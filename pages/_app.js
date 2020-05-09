import Head from "next/head";
import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme, themeDark } from "../src/theme";
import { UserContextProvider, UserContext } from "../src/UserContext";

// _app.js - inject theme here, query dark mode

function AppNoCtx(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Brew's Bookshelf</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:wght@700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <UserContext.Consumer>
        {({ darkMode }) => (
          <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        )}
      </UserContext.Consumer>
    </React.Fragment>
  );
}

export default function App(props) {
  return (
    <UserContextProvider>
      <AppNoCtx {...props} />
    </UserContextProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
