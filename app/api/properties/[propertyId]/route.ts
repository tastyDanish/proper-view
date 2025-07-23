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

	// Placeholder: Update property
	return Response.json({ message: `Would update property ${propertyId}` });
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

	// Placeholder: Delete property
	return Response.json({ message: `Would delete property ${propertyId}` });
}
