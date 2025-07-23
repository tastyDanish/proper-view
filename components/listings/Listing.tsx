import React from "react";
import { Property } from "../../lib/db/properties";

interface ListingProps {
  property: Property;
}

const Listing: React.FC<ListingProps> = ({ property }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
      <div className="text-gray-600 mb-1 flex gap-2">
        <div>{property.street_address}</div>
        <div>{property.city}</div>
      </div>

      <div className="mb-1">
        Price:{" "}
        <span className="font-bold">${property.price.toLocaleString()}</span>
      </div>
      <div className="mb-1">
        Bedrooms: {property.bedrooms} | Bathrooms: {property.bathrooms}
      </div>
    </div>
  );
};

export default Listing;
