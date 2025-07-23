// GET /api/agent/properties - list all agent-owned proeprties

function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const agentId = searchParams.get("agentId");

	if (!agentId) {
		return Response.json({ error: "Agent ID is required" }, { status: 400 });
	}
}
