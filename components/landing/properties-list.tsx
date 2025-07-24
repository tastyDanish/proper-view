import { Property } from "@/lib/db";
import { AnimatePresence, motion } from "framer-motion";
import Listing from "../listings/Listing";
import ListingDetail from "../listings/Listing-detail";
import ListingFilter from "../listings/Listing-filter";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useListingsStore } from "@/lib/store/listings-store";
import { useEffect, useState } from "react";

const PropertiesList = () => {
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
    <>
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
    </>
  );
};

export default PropertiesList;
