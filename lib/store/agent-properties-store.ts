import { create } from "zustand";
import {
	createProperty,
	deleteProperty,
	Property,
	updateProperty,
} from "../db/properties";

interface AgentPropertiesState {
	properties: Property[];
	setProperties: (properties: Property[]) => void;
	addProperty: (property: Omit<Property, "id">) => Promise<void>;
	updateProperty: (property: Property) => Promise<void>;
	deleteProperty: (id: string) => Promise<void>;
	agentName: string;
	setAgentName: (name: string) => void;
	clearProperties: () => void;
}

export const useAgentPropertiesStore = create<AgentPropertiesState>((
	set,
	get,
) => ({
	properties: [],
	setProperties: (properties) => set({ properties }),
	addProperty: async (property) => {
		const { data, error } = await createProperty(property as any);
		if (!error && data) {
			set((state) => ({ properties: [...state.properties, data] }));
		}
	},
	updateProperty: async (property) => {
		const { data, error } = await updateProperty(property as any);
		if (!error && data) {
			set((state) => ({
				properties: state.properties.map((p) => p.id === data.id ? data : p),
			}));
		}
	},
	deleteProperty: async (id) => {
		const { error } = await deleteProperty(id);
		if (!error) {
			set((state) => ({
				properties: state.properties.filter((p) => p.id !== id),
			}));
		}
	},
	agentName: "",
	setAgentName: (name) => set({ agentName: name }),
	clearProperties: () => set({ properties: [] }),
}));
