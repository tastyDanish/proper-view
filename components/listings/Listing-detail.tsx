import { motion, AnimatePresence } from "framer-motion";
import { Property } from "@/lib/db/properties";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListingGallery from "./listing-gallery";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface ListingDetailProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  layoutId: string;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

export default function ListingDetail({
  property,
  isOpen,
  onClose,
  layoutId,
}: ListingDetailProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trigger({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      property_id: property.id,
      agent_id: property.agent_id,
    });
  };

  // SWR mutation for inquiry submission
  const submitInquiry = async (url: string, { arg }: { arg: any }) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error("Failed to submit inquiry");
    return res.json();
  };

  const { trigger, isMutating } = useSWRMutation(
    "/api/inquiries",
    submitInquiry,
    {
      onSuccess: () => {
        toast.success("Inquiry submitted!", { position: "top-right" });
        setForm({ name: "", email: "", message: "", phone: "" });
        onClose();
      },
      onError: () => {
        toast.error("Failed to submit inquiry", { position: "top-right" });
      },
    }
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}>
          <motion.div
            className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative z-50"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layoutId={layoutId}
            onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl px-3 py-2 flex items-center justify-center"
              onClick={onClose}
              aria-label="Close">
              <X className="w-10 h-10" />
            </Button>
            <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
            <p className="mb-4 text-gray-600">{property.description}</p>
            <div className="mb-4">
              <ListingGallery />
              <span className="font-semibold">Address:</span>{" "}
              {property.street_address}, {property.city}
              <div className="mb-1">
                <span className="font-bold">
                  ${property.price.toLocaleString()}
                </span>
              </div>
              <div className="mb-1">
                Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="phone"
                name="phone"
                placeholder="Your Phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={isMutating}>
                {isMutating ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
