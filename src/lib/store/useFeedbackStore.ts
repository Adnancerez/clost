import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FeedbackType = "experience" | "product" | "bug" | "suggestion";

export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  rating: number; // 1 to 5
  message: string;
  email?: string;
  pageUrl: string;
  createdAt: string;
}

interface FeedbackState {
  isOpen: boolean;
  feedbacks: FeedbackItem[];
  openFeedback: () => void;
  closeFeedback: () => void;
  toggleFeedback: () => void;
  addFeedback: (item: Omit<FeedbackItem, "id" | "createdAt">) => void;
  deleteFeedback: (id: string) => void;
  clearAllFeedbacks: () => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      isOpen: false,
      feedbacks: [
        {
          id: "fb-1",
          type: "experience",
          rating: 5,
          message: "Sitenin brutalist tasarımı ve Y2K sokak kıyafetlerinin renkleri harika!",
          email: "deneyim@clost.store",
          pageUrl: "/collections/all",
          createdAt: "31 Ağustos 2026 15:30",
        },
        {
          id: "fb-2",
          type: "product",
          rating: 5,
          message: "Sloid Unicorn hoodie ve balon denim kombini kusursuz duruyor.",
          email: "skater@clost.store",
          pageUrl: "/lookbook",
          createdAt: "31 Ağustos 2026 16:45",
        },
      ],

      openFeedback: () => set({ isOpen: true }),
      closeFeedback: () => set({ isOpen: false }),
      toggleFeedback: () => set((state) => ({ isOpen: !state.isOpen })),

      addFeedback: (item) =>
        set((state) => ({
          feedbacks: [
            {
              ...item,
              id: `fb-${Date.now()}`,
              createdAt: new Date().toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            ...state.feedbacks,
          ],
        })),

      deleteFeedback: (id) =>
        set((state) => ({
          feedbacks: state.feedbacks.filter((fb) => fb.id !== id),
        })),

      clearAllFeedbacks: () => set({ feedbacks: [] }),
    }),
    {
      name: "clost-feedback-storage",
    }
  )
);
