import { supabase } from "../supabaseClient";
import type { Database } from "../../types/database.types";

export async function getProperties() {
	return supabase.from("properties").select("*");
}

export async function getPropertyById(id: string) {
	return supabase.from("properties").select("*").eq("id", id).single();
}

export async function getPropertiesByAgentId(agentId: string) {
	return supabase.from("properties").select("*").eq("agent_id", agentId);
}

export async function createProperty(
	property: Database["public"]["Tables"]["properties"]["Insert"],
) {
	return supabase.from("properties").insert(property).select().single();
}
