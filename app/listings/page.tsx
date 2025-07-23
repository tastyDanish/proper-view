"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { useListingsStore } from "../../lib/store/listings-store";
import { AnimatePresence, motion } from "framer-motion";
import { Property } from "../../lib/db/properties";
import Listing from "@/components/listings/Listing";
import ListingFilter from "@/components/listings/Listing-filter";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListingsPage() {
  const { data, error, isLoading } = useSWR<Property[]>(
    "/api/properties",
    fetcher
  );
  const { listings, setListings, getFilteredListings } = useListingsStore();

  useEffect(() => {
    if (data) setListings(data);
  }, [data, setListings]);

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties.</div>;

  return (
    <div className="p-4">
      <ListingFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {getFilteredListings().map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <Listing property={property} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
