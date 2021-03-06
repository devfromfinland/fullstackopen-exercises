import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnose } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: { [code: string]: Diagnose };
};

const initialState: State = {
  patients: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientList: Patient[]) => {
  // console.log(patientList);
  return (dispatch: React.Dispatch<Action>) => {
    dispatch({
      type: "SET_PATIENT_LIST",
      payload: patientList
    });
  };
};

export const setDiagnoseList = (diagnoseList: Diagnose[]) => {
  return (dispatch: React.Dispatch<Action>) => {
    dispatch({
      type: 'SET_DIAGNOSIS_LIST',
      payload: diagnoseList
    });
  };
};