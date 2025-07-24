"use client";
import React from "react";
import AgentPropertyCard from "@/components/agent-dashboard/Agent-property-card";
import NewListingDialog from "@/components/agent-dashboard/New-listing-dialog";
import ProperViewLogo from "@/components/shared/proper-view-logo";
import { useAgentProperties } from "@/lib/hooks/use-agent-properties";
import { useUserStore } from "@/lib/store/user-store";

const AgentDashboard = () => {
  const agentName = useUserStore((state) => state.agentName);
  const { properties, isLoading, error } = useAgentProperties(agentName);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <ProperViewLogo />
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <NewListingDialog agentName={agentName} />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">Failed to load listings.</div>}
      <div className="grid gap-4">
        {properties.map((property) => (
          <AgentPropertyCard
            key={property.id}
            property={property}
            agentName={agentName}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;
