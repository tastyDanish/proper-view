"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useListingsStore } from "../../lib/store/listings-store";
import { AnimatePresence, motion } from "framer-motion";
import { Property } from "../../lib/db/properties";
import Listing from "@/components/listings/Listing";
import ListingFilter from "@/components/listings/Listing-filter";
import ListingDetail from "@/components/listings/Listing-detail";
import ProperViewLogo from "@/components/shared/proper-view-logo";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListingsPage() {
  const { data, error, isLoading } = useSWR<Property[]>(
    "/api/properties",
    fetcher
  );
  const { setListings, getFilteredListings } = useListingsStore();
  const [selectedListing, setSelectedListing] = useState<Property | null>(null);

  useEffect(() => {
    if (data) setListings(data);
  }, [data, setListings]);

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 mt-4">
        <ProperViewLogo />
      </div>
      <div className="w-full flex justify-center">
        <ListingFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {getFilteredListings().map((property) => (
            <motion.div
              key={property.id}
              layoutId={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedListing(property)}
              className="cursor-pointer">
              <Listing property={property} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ListingDetail
        property={selectedListing as Property}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        layoutId={selectedListing?.id || ""}
      />
    </div>
  );
}
