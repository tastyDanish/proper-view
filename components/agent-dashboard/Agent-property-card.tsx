import React, { useState } from "react";
import { Property } from "@/lib/db/properties";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAgentPropertiesStore } from "@/lib/store/agent-properties-store";

interface AgentPropertyCardProps {
  property: Property;
}

const AgentPropertyCard: React.FC<AgentPropertyCardProps> = ({ property }) => {
  const { updateProperty, deleteProperty } = useAgentPropertiesStore();
  const [editMode, setEditMode] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [form, setForm] = useState({ ...property });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    await updateProperty({
      id: property.id,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      description: form.description || "",
      title: form.title || "",
      street_address: form.street_address || "",
      city: form.city || "",
      status: form.status || "active",
    });
    setLoading(false);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm({ ...property });
    setEditMode(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteProperty(property.id);
    setLoading(false);
    setShowDelete(false);
  };

  return (
    <div className="relative border rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex-1 grid gap-2">
        {editMode ? (
          <>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="title">
                Title
              </label>
              <input
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="Title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="street_address">
                Street Address
              </label>
              <input
                name="street_address"
                value={form.street_address || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="Street Address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="city">
                City
              </label>
              <input
                name="city"
                value={form.city || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="City"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="price">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={form.price || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="Price"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="bedrooms">
                Bedrooms
              </label>
              <input
                name="bedrooms"
                type="number"
                value={form.bedrooms || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="Bedrooms"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="bathrooms">
                Bathrooms
              </label>
              <input
                name="bathrooms"
                type="number"
                value={form.bathrooms || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="Bathrooms"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="font-bold"
                htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                className="border rounded px-2 py-1 mb-1"
                placeholder="Description"
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-1">{property.title}</h2>
            <div className="text-gray-600 mb-1 flex gap-2">
              <div>{property.street_address}</div>
              <div>{property.city}</div>
            </div>
            <div className="mb-1">
              Price:{" "}
              <span className="font-bold">
                ${property.price?.toLocaleString?.() ?? property.price}
              </span>
            </div>
            <div className="mb-1">
              Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
            </div>
            {property.description && (
              <div className="mb-1 text-gray-700">{property.description}</div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col h-full justify-end gap-2 mt-4 md:mt-0 md:ml-4">
        {editMode ? (
          <>
            <Button
              onClick={handleSave}
              disabled={loading}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => setEditMode(true)}>
              Edit
            </Button>
            <Dialog
              open={showDelete}
              onOpenChange={setShowDelete}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  onClick={() => setShowDelete(true)}>
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  this property.
                </DialogDescription>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}>
                    Yes, delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDelete(false)}
                    disabled={loading}>
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default AgentPropertyCard;
