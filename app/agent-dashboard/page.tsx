"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { useAgentPropertiesStore } from "@/lib/store/agent-properties-store";
import Listing from "@/components/listings/Listing";
import { Button } from "@/components/ui/button";
import NewListingDialog from "@/components/agent-dashboard/New-listing-dialog";

// TODO: Replace with real agentId from auth/session
const AGENT_ID = "demo-agent";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <NewListingDialog />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">Failed to load listings.</div>}
      <div className="grid gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative border rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
            <Listing property={property} />
            <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
              <Button variant="outline">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentDashboard;
