import { create } from "zustand";

export const usePrStore = create((set) => ({
  PRs: [],
  //set prs
  setPRs: (prs) =>
    set(() => ({
      PRs: prs,
    })),
  addPR: (pr) =>
    set((state) => ({
      PRs: [...state.PRs, pr],
    })),
  removePR: (id) =>
    set((state) => ({
      PRs: state.PRs.filter((pr) => pr.id !== id),
    })),
  updatePR: (pr) =>
    set((state) => ({
      PRs: state.PRs.map((prs) => {
        if (prs.id === pr.id) {
          return {
            ...pr,
          };
        } else {
          return prs;
        }
      }),
    })),
}));
