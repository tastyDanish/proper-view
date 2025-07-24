import { create } from "zustand";
import { deleteProperty, Property, updateProperty } from "../db/properties";

interface AgentPropertiesState {
	properties: Property[];
	setProperties: (properties: Property[]) => void;
	addProperty: (property: Omit<Property, "id">) => Promise<void>;
	updateProperty: (
		property: Omit<Property, "created_at" | "updated_at" | "agent_id">,
	) => Promise<void>;
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
		const res = await fetch("/api/properties", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...property, agent_name: get().agentName }),
		});
		const data = await res.json();
		if (res.ok && data) {
			set((state) => ({ properties: [...state.properties, data] }));
		}
	},
	updateProperty: async (property) => {
		const res = await fetch(`/api/properties/${property.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(property),
		});
		const data = await res.json();
		if (res.ok && data) {
			set((state) => ({
				properties: state.properties.map((p) => p.id === data.id ? data : p),
			}));
		}
	},
	deleteProperty: async (id) => {
		const res = await fetch(`/api/properties/${id}`, {
			method: "DELETE",
		});
		if (res.ok) {
			set((state) => ({
				properties: state.properties.filter((p) => p.id !== id),
			}));
		}
	},
	agentName: "",
	setAgentName: (name) => set({ agentName: name }),
	clearProperties: () => set({ properties: [] }),
}));
