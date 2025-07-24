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
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* City Filter */}
      <div className="flex flex-col gap-2 p-4 border rounded-lg bg-white shadow-sm">
        <span className="font-semibold">City</span>
        <div className="h-full flex flex-col justify-center">
          <select
            className="input input-bordered w-32 border border-gray-300 px-2"
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
      <div className="flex flex-col gap-2 p-4 border rounded-lg bg-white shadow-sm">
        <span className="font-semibold">Price</span>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered w-20 border border-gray-300 px-2"
            value={filters.price.min ?? ""}
            onChange={(e) =>
              setPriceFilter(
                e.target.value ? Number(e.target.value) : null,
                filters.price.max
              )
            }
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered w-20 border border-gray-300 px-2"
            value={filters.price.max ?? ""}
            onChange={(e) =>
              setPriceFilter(
                filters.price.min,
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
          />
          <Button
            variant="outline"
            onClick={() => setPriceFilter(null, null)}
            type="button">
            Clear
          </Button>
        </div>
      </div>
      {/* Bedrooms Filter */}
      <div className="flex flex-col gap-2 p-4 border rounded-lg bg-white shadow-sm">
        <span className="font-semibold">Bedrooms</span>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered w-20 border border-gray-300 px-2"
            value={filters.bedrooms.min ?? ""}
            onChange={(e) =>
              setBedroomFilter(
                e.target.value ? Number(e.target.value) : null,
                filters.bedrooms.max
              )
            }
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered w-20 border border-gray-300 px-2"
            value={filters.bedrooms.max ?? ""}
            onChange={(e) =>
              setBedroomFilter(
                filters.bedrooms.min,
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
          />
          <Button
            variant="outline"
            onClick={() => setBedroomFilter(null, null)}
            type="button">
            Clear
          </Button>
        </div>
      </div>
      {/* Bathrooms Filter */}
      <div className="flex flex-col gap-2 p-4 border rounded-lg bg-white shadow-sm">
        <span className="font-semibold">Bathrooms</span>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered w-20 border border-gray-300 px-2"
            value={filters.bathrooms.min ?? ""}
            onChange={(e) =>
              setBathroomFilter(
                e.target.value ? Number(e.target.value) : null,
                filters.bathrooms.max
              )
            }
            min={0}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered w-20 border border-gray-300 px-2"
            value={filters.bathrooms.max ?? ""}
            onChange={(e) =>
              setBathroomFilter(
                filters.bathrooms.min,
                e.target.value ? Number(e.target.value) : null
              )
            }
            min={0}
          />
          <Button
            variant="outline"
            onClick={() => setBathroomFilter(null, null)}
            type="button">
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingFilter;
