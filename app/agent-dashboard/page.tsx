"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { useAgentPropertiesStore } from "@/lib/store/agent-properties-store";
import AgentPropertyCard from "@/components/agent-dashboard/Agent-property-card";
import { Button } from "@/components/ui/button";
import NewListingDialog from "@/components/agent-dashboard/New-listing-dialog";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";

const AgentDashboard = () => {
  const router = useRouter();
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
      <div onClick={() => router.push("/")}>
        <h1>Proper View</h1>
      </div>
      <div className="flex justify-between items-center mb-6">
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
