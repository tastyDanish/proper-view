import { supabase } from "../supabaseClient";
import type { Database } from "../../types/database.types";

export async function getInquiries() {
	return supabase.from("inquiries").select("*");
}

export async function getInquiryById(id: string) {
	return supabase.from("inquiries").select("*").eq("id", id).single();
}

// Add more CRUD functions as needed
