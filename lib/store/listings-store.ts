import { create } from "zustand";
import { Property } from "../db/properties";

interface ListingsState {
	listings: Property[];
	filters: {
		price: { min: number | null; max: number | null };
		bedrooms: { min: number | null; max: number | null };
		bathrooms: { min: number | null; max: number | null };
	};
	setListings: (listings: Property[]) => void;
	setPriceFilter: (min: number | null, max: number | null) => void;
	setBedroomFilter: (min: number | null, max: number | null) => void;
	setBathroomFilter: (min: number | null, max: number | null) => void;
	sortListings: (key: keyof Property, direction?: "asc" | "desc") => void;
	getFilteredListings: () => Property[];
}

export const useListingsStore = create<ListingsState>((set, get) => ({
	listings: [],
	filters: {
		price: { min: null, max: null },
		bedrooms: { min: null, max: null },
		bathrooms: { min: null, max: null },
	},
	setListings: (listings) => set({ listings }),
	setPriceFilter: (min, max) =>
		set((state) => ({ filters: { ...state.filters, price: { min, max } } })),
	setBedroomFilter: (min, max) =>
		set((state) => ({ filters: { ...state.filters, bedrooms: { min, max } } })),
	setBathroomFilter: (min, max) =>
		set((state) => ({
			filters: { ...state.filters, bathrooms: { min, max } },
		})),
	sortListings: (key, direction = "asc") => {
		const sorted = [...get().listings].sort((a, b) => {
			if (a[key] === b[key]) return 0;
			if (a[key] == null) return 1;
			if (b[key] == null) return -1;
			if (a[key]! < b[key]!) return direction === "asc" ? -1 : 1;
			return direction === "asc" ? 1 : -1;
		});
		set({ listings: sorted });
	},
	getFilteredListings: () => {
		const { listings, filters } = get();
		return listings.filter((listing) => {
			const price = listing.price as number | undefined;
			const bedrooms = listing.bedrooms as number | undefined;
			const bathrooms = listing.bathrooms as number | undefined;

			const priceOk =
				(filters.price.min == null ||
					(price != null && price >= filters.price.min)) &&
				(filters.price.max == null ||
					(price != null && price <= filters.price.max));
			const bedroomsOk =
				(filters.bedrooms.min == null ||
					(bedrooms != null && bedrooms >= filters.bedrooms.min)) &&
				(filters.bedrooms.max == null ||
					(bedrooms != null && bedrooms <= filters.bedrooms.max));
			const bathroomsOk =
				(filters.bathrooms.min == null ||
					(bathrooms != null && bathrooms >= filters.bathrooms.min)) &&
				(filters.bathrooms.max == null ||
					(bathrooms != null && bathrooms <= filters.bathrooms.max));

			return priceOk && bedroomsOk && bathroomsOk;
		});
	},
}));
