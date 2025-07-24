import { supabase } from "../supabaseClient";
import type { Database } from "../../types/database.types";

export type Property = Database["public"]["Tables"]["properties"]["Row"];

export async function getProperties() {
	return supabase.from("properties").select("*").eq("status", "active");
}

export async function getPropertyById(id: string) {
	return supabase.from("properties").select("*").eq("id", id).single();
}

// we're using name for now since we don't have any real accounts.
export async function getPropertiesByAgentName(agentName: string) {
	return supabase
		.from("properties")
		.select("*, agents!inner(*)")
		.eq("agents.name", agentName)
		.order("created_at", { ascending: false });
}

export async function createProperty(
	property: Database["public"]["Tables"]["properties"]["Insert"],
) {
	return supabase.from("properties").insert(property).select().single();
}

export async function updateProperty(
	property: Database["public"]["Tables"]["properties"]["Update"],
) {
	if (!property.id) {
		throw new Error("Property id is required for update.");
	}
	return supabase.from("properties").update(property).eq(
		"id",
		property.id as string,
	).select().single();
}

export async function deleteProperty(id: string) {
	return supabase.from("properties").delete().eq("id", id);
}
