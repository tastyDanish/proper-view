// POST /api/inquiries - create a new inquiry

import { createInquiry } from "@/lib/db";

export async function POST(request: Request) {
	const body = await request.json();

	const {
		agent_id,
		property_id,
		name,
		email,
		phone,
		message,
	} = body;

	if (!agent_id || !property_id || !name || !email || !phone || !message) {
		return Response.json({ error: "All fields are required" }, { status: 400 });
	}

	const { data, error } = await createInquiry(body);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
