import { useState, useEffect } from "react";

type Location = {
  pathname: string;
  search: string;
};

function getCurrentLocation(): Location {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  };
}

type Listener = () => void;

const listeners: Listener[] = [];

/**
 * Notifies all location listeners. Can be used if the history state has been manipulated
 * in by another module. Effectifely, all components using the 'useLocation' hook will
 * update.
 */
export function notify() {
  listeners.forEach((listener) => listener());
}

export function useLocation() {
  const [{ pathname, search }, setLocation] = useState(getCurrentLocation());

  useEffect(() => {
    window.addEventListener("popstate", handleChange);
    return () => window.removeEventListener("popstate", handleChange);
  }, []);

  useEffect(() => {
    listeners.push(handleChange);
    return () => listeners.splice(listeners.indexOf(handleChange), 1);
  }, []);

  function handleChange() {
    setLocation(getCurrentLocation());
  }

  function push(url: string, _notify = true) {
    window.history.pushState(null, "", url);
    if (_notify) notify();
  }

  function replace(url: string, _notify = true) {
    window.history.replaceState(null, "", url);
    if (_notify) notify();
  }

  return {
    push,
    replace,
    pathname,
    search,
  };
}
