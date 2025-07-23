// POST /api/inquiries - create a new inquiry

async function POST(request: Request) {
	const body = await request.json();

	const { agentId, propertyId, name, email, phone, message } = body;

	if (!agentId || !propertyId || !name || !email || !phone || !message) {
		return Response.json({ error: "All fields are required" }, { status: 400 });
	}
}
