// GET /api/properties - list all properties
// POST /api/properties - create a new property
// DELETE /api/properties/:id - delete a property
// PUT /api/properties/:id - update a property

import { createProperty, getProperties } from "@/lib/db";

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
		address,
		price,
		description,
		bedrooms,
		bathrooms,
		agent_id,
	} = body;

	if (
		!title ||
		!address ||
		!price ||
		!description ||
		!bedrooms ||
		!bathrooms ||
		!agent_id
	) {
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
