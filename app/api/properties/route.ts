// GET /api/properties - list all properties
// POST /api/properties - create a new property
// DELETE /api/properties/:id - delete a property
// PUT /api/properties/:id - update a property

import { createProperty } from "@/lib/db";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const agentId = searchParams.get("agentId");

	if (!agentId) {
		return Response.json({ error: "Agent ID is required" }, { status: 400 });
	}

	// Placeholder: Fetch properties for the agent
	return Response.json({
		message: `Would list properties for agentId: ${agentId}`,
	});
}

export async function POST(request: Request) {
	const body = await request.json();
	// Extract property fields (example: title, address, price, etc.)
	const { title, address, price, agentId } = body;

	if (!title || !address || !price || !agentId) {
		return Response.json({ error: "Missing required property fields" }, {
			status: 400,
		});
	}

	const { data, error } = await createProperty(body);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
