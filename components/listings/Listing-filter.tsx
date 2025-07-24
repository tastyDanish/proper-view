import React, { useMemo } from "react";
import { useListingsStore } from "../../lib/store/listings-store";
import { Button } from "../ui/button";

const ListingFilter: React.FC = () => {
  const {
    filters,
    setPriceFilter,
    setBedroomFilter,
    setBathroomFilter,
    setCityFilter,
    listings,
  } = useListingsStore();

  // Get unique cities from listings
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    listings.forEach((l) => {
      if (l.city) citySet.add(l.city);
    });
    return Array.from(citySet).sort();
  }, [listings]);

  return (
    <div className="flex flex-col [@media(min-width:1044px)]:flex-row gap-4 mb-6">
      {/* City Filter */}
      <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm max-w-sm w-full md:w-56 min-w-[180px]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-base">City</span>
          <Button
            variant="outline"
            className="px-3 py-1 text-sm"
            onClick={() => setCityFilter(null)}
            type="button">
            Clear
          </Button>
        </div>
        <div className="h-full flex flex-col justify-end">
          <select
            className="input input-bordered w-full border border-gray-300 px-3 py-2 text-base"
            value={filters.city ?? ""}
            onChange={(e) => setCityFilter(e.target.value || null)}>
            <option value="">All</option>
            {cities.map((city) => (
              <option
                key={city}
                value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Price Filter */}
      <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm max-w-sm w-full [@media(min-width:1044px)]:w-70 min-w-[100px]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-base">Price</span>
          <Button
            variant="outline"
            className="px-3 py-1 text-sm"
            onClick={() => setPriceFilter(null, null)}
            type="button">
            Clear
          </Button>
        </div>
        <div className="flex gap-2 md:items-center justify-around [@media(min-width:1044px)]:flex-row flex-col">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered [@media(min-width:1044px)]:w-28 border border-gray-300 px-3 py-2 text-base w-full"
            value={filters.price.min ?? ""}
            onChange={(e) =>
              setPriceFilter(
                e.target.value ? Number(e.target.value) : null,
                filters.price.max
              )
            }
            min={0}
          />
          <span className="[@media(min-width:1044px)]:block hidden">-</span>
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered [@media(min-width:1044px)]:w-28 border border-gray-300 px-3 py-2 text-base w-full"
            value={filters.price.max ?? ""}
            onChange={(e) =>
              setPriceFilter(
                filters.price.min,
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
          />
        </div>
      </div>
      {/* Bedrooms Filter */}
      <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm max-w-sm w-full md:w-56 min-w-[100px]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-base">Bedrooms</span>
          <Button
            variant="outline"
            className="px-3 py-1 text-sm"
            onClick={() => setBedroomFilter(null, null)}
            type="button">
            Clear
          </Button>
        </div>
        <div className="flex gap-2 md:items-center justify-around md:flex-row flex-col">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered md:w-20 border border-gray-300 px-3 py-2 text-base w-full"
            value={filters.bedrooms.min ?? ""}
            onChange={(e) =>
              setBedroomFilter(
                e.target.value ? Number(e.target.value) : null,
                filters.bedrooms.max
              )
            }
            min={0}
          />
          <span className="md:block hidden">-</span>
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered md:w-20 border border-gray-300 px-3 py-2 text-base w-full"
            value={filters.bedrooms.max ?? ""}
            onChange={(e) =>
              setBedroomFilter(
                filters.bedrooms.min,
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
          />
        </div>
      </div>
      {/* Bathrooms Filter */}
      <div className="flex flex-col gap-2 p-3 border rounded-lg bg-white shadow-sm max-w-sm w-full md:w-56 min-w-[100px]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-base">Bathrooms</span>
          <Button
            variant="outline"
            className="px-3 py-1 text-sm"
            onClick={() => setBathroomFilter(null, null)}
            type="button">
            Clear
          </Button>
        </div>
        <div className="flex gap-2 md:items-center md:flex-row justify-around flex-col">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered md:w-20 border border-gray-300 px-3 py-2 text-base w-full"
            value={filters.bathrooms.min ?? ""}
            onChange={(e) =>
              setBathroomFilter(
                e.target.value ? Number(e.target.value) : null,
                filters.bathrooms.max
              )
            }
            min={0}
          />
          <span className="md:block hidden">-</span>
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered md:w-20 border border-gray-300 px-3 py-2 text-base w-full"
            value={filters.bathrooms.max ?? ""}
            onChange={(e) =>
              setBathroomFilter(
                filters.bathrooms.min,
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingFilter;
