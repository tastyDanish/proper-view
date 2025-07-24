import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { Property } from "../db/properties";
import { fetcher } from "../fetcher";
import { toast } from "react-toastify";

const addPropertyFn = async (
	url: string,
	{ arg }: { arg: Omit<Property, "id"> & { agent_name: string } },
) => {
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});
	if (!res.ok) throw new Error("Failed to add property");
	return res.json();
};

const updatePropertyFn = async (
	url: string,
	{ arg }: { arg: Partial<Property> & { id: string } },
) => {
	const res = await fetch(`${url}/${arg.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(arg),
	});
	if (!res.ok) throw new Error("Failed to update property");
	return res.json();
};

const deletePropertyFn = async (url: string, { arg: id }: { arg: string }) => {
	const res = await fetch(`${url}/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) throw new Error("Failed to delete property");
	return id;
};

export function useAgentProperties(agentName: string) {
	const propertiesKey = `/api/agent/properties/${agentName}`;
	const { data, error, isLoading } = useSWR<Property[]>(propertiesKey, fetcher);

	const { trigger: addProperty, isMutating: isAdding } = useSWRMutation(
		"/api/properties",
		addPropertyFn,
		{
			onSuccess: () => {
				toast.success("Property added successfully");
				mutate(propertiesKey);
			},
		},
	);

	const { trigger: updateProperty, isMutating: isUpdating } = useSWRMutation(
		"/api/properties",
		updatePropertyFn,
		{
			onSuccess: () => {
				toast.success("Property updated successfully");
				mutate(propertiesKey);
			},
		},
	);

	const { trigger: deleteProperty, isMutating: isDeleting } = useSWRMutation(
		"/api/properties",
		deletePropertyFn,
		{
			onSuccess: () => {
				toast.success("Property deleted successfully");
				mutate(propertiesKey);
			},
		},
	);

	return {
		properties: data || [],
		isLoading,
		error,
		addProperty,
		isAdding,
		updateProperty,
		isUpdating,
		deleteProperty,
		isDeleting,
		mutate: () => mutate(propertiesKey),
	};
}
