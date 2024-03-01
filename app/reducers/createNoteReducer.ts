interface CreateEditorNote {
  type: "EDITOR";
}

interface CreateQuickNote {
  type: "QUICK_NOTE";
}

interface CreateCheckbox {
  type: "CHECKBOX";
}

interface CloseModal {
  type: "CLOSE";
}

interface CreateNoteState {
  quickNote: boolean;
  editor: boolean;
  checkbox: boolean;
}

type createNoteType =
  | CreateQuickNote
  | CreateEditorNote
  | CreateCheckbox
  | CloseModal;

export const createNoteReducer = (
  state: CreateNoteState,
  action: createNoteType
) => {
  switch (action.type) {
    case "QUICK_NOTE":
      return {
        ...state,
        quickNote: true,
        editor: false,
        checkbox: false,
      };
    case "EDITOR":
      return {
        ...state,
        quickNote: false,
        editor: true,
        checkbox: false,
      };
    case "CHECKBOX":
      return {
        ...state,
        quickNote: false,
        editor: false,
        checkbox: true,
      };
    case "CLOSE":
      return {
        ...state,
        quickNote: false,
        editor: false,
        checkbox: false,
      };
    default:
      return state;
  }
};
