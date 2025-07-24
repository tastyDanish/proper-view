import { supabase } from "../supabaseClient";

export async function getAgentByName(name: string) {
	return supabase.from("agents").select("*").eq("name", name).single();
}
