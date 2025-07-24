// GET /api/properties - list all properties
// POST /api/properties - create a new property
// DELETE /api/properties/:id - delete a property
// PUT /api/properties/:id - update a property

import { createProperty, getAgentByName, getProperties } from "@/lib/db";

export async function GET(request: Request) {
	const { data, error } = await getProperties();
	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}

export async function POST(request: Request) {
	const body = await request.json();
	// Extract property fields (example: title, address, price, etc.)
	const {
		title,
		street_address,
		city,
		price,
		description,
		bedrooms,
		bathrooms,
	} = body;

	const { agent_name, ...propertyData } = body;

	if (
		!title ||
		!street_address ||
		!city ||
		!price ||
		!description ||
		!bedrooms ||
		!bathrooms ||
		!agent_name
	) {
		return Response.json({ error: "Missing required property fields" }, {
			status: 400,
		});
	}

	const { data: agent, error: agentError } = await getAgentByName(agent_name);
	if (agentError) {
		return Response.json({ error: agentError.message }, { status: 500 });
	}

	const { data, error } = await createProperty({
		...propertyData,
		agent_id: agent.id,
	});

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
