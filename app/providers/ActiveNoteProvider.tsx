"use client";
import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import {
  ModalReducerState,
  ModalReducerType,
  openModalReducer,
} from "../reducers/openModalReducer";

interface ActiveNoteContextType {
  state: ModalReducerState;
  dispatch: Dispatch<ModalReducerType>;
}

export const ActiveNoteContext = createContext<ActiveNoteContextType>(
  {} as ActiveNoteContextType
);

export const ActiveNoteProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(openModalReducer, {
    activeNote: null,
    editActive: false,
    previewActive: false,
    editCounter: 0,
  });


  return (
    <ActiveNoteContext.Provider value={{ state, dispatch }}>
      {children}
    </ActiveNoteContext.Provider>
  );
};
