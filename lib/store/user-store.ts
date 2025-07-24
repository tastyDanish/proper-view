import { create } from "zustand";
import { Property } from "../db/properties";

interface UserState {
	agentName: string;
	setAgentName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
	agentName: "",
	setAgentName: (name) => set({ agentName: name }),
}));
