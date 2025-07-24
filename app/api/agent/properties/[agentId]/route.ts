// GET /api/agent/properties - list all agent-owned proeprties

import { getPropertiesByAgentName } from "@/lib/db";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ agentId: string }> },
) {
	const { agentId } = await params;

	if (!agentId) {
		return Response.json({ error: "Agent ID is required" }, { status: 400 });
	}

	// for now we are using name for agentId since we don't have any real accounts.
	const { data, error } = await getPropertiesByAgentName(agentId);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}
