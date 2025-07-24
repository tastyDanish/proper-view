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
import PropertiesList from "@/components/landing/properties-list";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ListingsPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 mt-4 pl-8">
        <ProperViewLogo />
        <div className="text-xl font-semibold text-indigo-700 italic select-none pr-24 md:block hidden">
          Find Your Next Home, The Proper Way.
        </div>
      </div>
      <div className="flex flex-row gap-4 [@media(min-width:1044px)]:flex-col">
        <div className="[@media(min-width:1044px)]:w-full flex [@media(min-width:1044px)]:flex-row [@media(min-width:1044px)]:justify-center [@media(min-width:1044px)]:flex-row:flex-row flex-col">
          <ListingFilter />
        </div>
        <PropertiesList />
      </div>
    </div>
  );
}
