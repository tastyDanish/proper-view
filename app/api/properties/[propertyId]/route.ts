import { deleteProperty, updateProperty } from "@/lib/db";
import { NextRequest } from "next/server";

// PUT /api/properties/:propertyId - update a property
export async function PUT(
	request: Request,
	{ params }: { params: { propertyId: string } },
) {
	const { propertyId } = params;
	const body = await request.json();
	// Extract fields to update (example: title, address, price, etc.)
	const { title, address, price } = body;

	if (!propertyId) {
		return Response.json({ error: "Property ID is required" }, { status: 400 });
	}

	const { data, error } = await updateProperty(body);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}

// DELETE /api/properties/:propertyId - delete a property
export async function DELETE(
	request: Request,
	{ params }: { params: { propertyId: string } },
) {
	const { propertyId } = params;

	if (!propertyId) {
		return Response.json({ error: "Property ID is required" }, { status: 400 });
	}

	const { data, error } = await deleteProperty(propertyId);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
