import { useState } from "react";
// building our own history (so that we can go backwards in a moment in time)
export default function useVisualMode(initial) {
  // start an initial state
  const [state, setState] = useState([initial]);
  // takes in mode and a replace boolean
  function transition(mode, replace) {
    // spreading array for a new state
    const newState = [...state];
    // get rid of last item and put in the new item instead
    if (replace) {
      // just pop last entry off the array
      newState.pop();
    }
    // push in new array and set it to the new state
    newState.push(mode);
    setState(newState);
  }
  // single array
  // checking length to make sure there is nothing to go back to ( if 1 or 0 entries there is nothing to go back to)
  const back = function () {
    if (state.length < 2) {
      return;
    }
    // we spread the original and then pop off the last entry, and reset the state
    const newState = [...state];
    newState.pop();
    setState(newState);
  };
  // we need to return the latest mode, so that the component can conditionally render
  const mode = state[state.length - 1];
  // returning the mode (current state) and two functions
  return { mode, transition, back };
}
