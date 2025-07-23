// GET /api/agent/properties - list all agent-owned proeprties

import { getPropertiesByAgentId } from "@/lib/db";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const agentId = searchParams.get("agentId");

	if (!agentId) {
		return Response.json({ error: "Agent ID is required" }, { status: 400 });
	}

	const { data, error } = await getPropertiesByAgentId(agentId);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
