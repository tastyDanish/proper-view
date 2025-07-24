"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { useAgentPropertiesStore } from "@/lib/store/agent-properties-store";
import AgentPropertyCard from "@/components/agent-dashboard/Agent-property-card";
import NewListingDialog from "@/components/agent-dashboard/New-listing-dialog";
import { fetcher } from "@/lib/fetcher";
import ProperViewLogo from "@/components/shared/proper-view-logo";

const AgentDashboard = () => {
  const { properties, setProperties, agentName } = useAgentPropertiesStore();
  const agentId = agentName || "demo-agent";
  const { data, error, isLoading } = useSWR(
    `/api/agent/properties/${agentId}`,
    fetcher
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setProperties(data);
    }
  }, [data, setProperties]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <ProperViewLogo />
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <NewListingDialog />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">Failed to load listings.</div>}
      <div className="grid gap-4">
        {properties.map((property) => (
          <AgentPropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;
