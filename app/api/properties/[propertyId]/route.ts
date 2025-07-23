import { deleteProperty, updateProperty } from "@/lib/db";
import { NextRequest } from "next/server";

// PUT /api/properties/:propertyId - update a property
export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ propertyId: string }> },
) {
	const { propertyId } = await params;
	const body = await request.json();

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
	{ params }: { params: Promise<{ propertyId: string }> },
) {
	const { propertyId } = await params;

	if (!propertyId) {
		return Response.json({ error: "Property ID is required" }, { status: 400 });
	}

	const { data, error } = await deleteProperty(propertyId);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
