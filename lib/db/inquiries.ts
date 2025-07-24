import { supabase } from "../supabaseClient";
import type { Database } from "../../types/database.types";

export async function getInquiries() {
	return supabase.from("inquiries").select("*");
}

export async function getInquiryById(id: string) {
	return supabase.from("inquiries").select("*").eq("id", id).single();
}

export async function createInquiry(
	inquiry: Database["public"]["Tables"]["inquiries"]["Insert"],
) {
	return supabase.from("inquiries").insert(inquiry).select().single();
}

export async function getInquiriesByPropertyId(propertyId: string) {
	return supabase.from("inquiries").select("*").eq("property_id", propertyId);
}
