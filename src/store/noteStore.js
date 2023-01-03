import create from "zustand";
import moment from "moment/moment";

const notesStore = create((set) => ({
  notes: [
    {
      id: new Date().valueOf(),
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      archived: false,
      isEdited: false,
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
  ],
  createNote: (title, body, archived) => {
    set((state) => ({
      notes: [
        {
          id: new Date().valueOf(),
          title,
          body,
          archived,
          isEdited: false,
          createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
        },
        ...state.notes,
      ],
    }));
  },
  updateNote: ({ id, title, body, archived }) => {
    set((state) => ({
      notes: state.notes.map((note) => {
        if (note.id == id) {
          return {
            ...note,
            title,
            body,
            archived,
            isEdited: true,
          };
        } else {
          return note;
        }
      }),
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
}));

export default notesStore;
