import { Note } from "@prisma/client";

interface OpeningEditModal {
  type: "EDIT";
  payload: Note;
}

interface OpeningPreviewModal {
  type: "PREVIEW";
  payload: Note;
}

interface ClosingModal {
  type: "CLOSE";
}

interface ModalReducerState {
  activeNote: Note | null;
  editActive: boolean;
  previewActive: boolean;
}

export type ModalReducerType =
  | OpeningEditModal
  | OpeningPreviewModal
  | ClosingModal;

export const openModalReducer = (
  state: ModalReducerState,
  action: ModalReducerType
): ModalReducerState => {
  switch (action.type) {
    case "EDIT":
      return {
        ...state,
        activeNote: action.payload,
        editActive: true,
        previewActive: false,
      };
    case "PREVIEW":
      return {
        ...state,
        activeNote: action.payload,
        editActive: false,
        previewActive: true,
      };
    case "CLOSE":
      return {
        ...state,
        editActive: false,
        previewActive: false,
      };
    default:
      return state;
  }
};