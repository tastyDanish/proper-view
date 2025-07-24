import React from "react";
import { useAgentPropertiesStore } from "@/lib/store/agent-properties-store";
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

const NewListingDialog = () => {
  const { addProperty } = useAgentPropertiesStore();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    street_address: "",
    city: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addProperty({
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      agent_id: "fake-agent-id",
      status: "active",
      created_at: null,
      updated_at: null,
    });
    setLoading(false);
    setOpen(false);
    setForm({
      title: "",
      street_address: "",
      city: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Listing</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Listing</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill out the details to create a new property listing.
        </DialogDescription>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mt-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="street_address"
            placeholder="Street Address"
            value={form.street_address}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="bedrooms"
            type="number"
            placeholder="Bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="bathrooms"
            type="number"
            placeholder="Bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            rows={3}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}>
              {loading ? "Creating..." : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewListingDialog;
