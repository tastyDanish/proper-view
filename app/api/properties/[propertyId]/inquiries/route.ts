// GET /api/properties/[propertyId]/inquiries - list all inquiries for a property

import { getInquiriesByPropertyId } from "@/lib/db";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ propertyId: string }> },
) {
	const { propertyId } = await params;

	if (!propertyId) {
		return Response.json({ error: "Property ID is required" }, { status: 400 });
	}

	const { data, error } = await getInquiriesByPropertyId(propertyId);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
