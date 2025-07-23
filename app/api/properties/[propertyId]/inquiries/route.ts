// GET /api/properties/[propertyId]/inquiries - list all inquiries for a property

export async function GET(
	request: Request,
	{ params }: { params: { propertyId: string } },
) {
	const { propertyId } = params;

	if (!propertyId) {
		return Response.json({ error: "Property ID is required" }, { status: 400 });
	}
}
