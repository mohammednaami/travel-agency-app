import { Header, TripCard } from "components";
import React from "react";
import { getAllTrips } from "~/appwrite/trips";
import type { Route } from "./+types/trips";
import { parseTripData } from "~/lib/utils";
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;
  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    })),
    total,
  };
};
const Trips = ({ loaderData }: Route.ComponentProps) => {
  const trips = loaderData.trips as Trip[] | [];
  return (
    <main className="dashboard wrapper">
      <Header
        title="Trips"
        description="View and manage all trips AI-Generated"
        ctaText="Create New Trip"
        ctaLink="/trips/create"
      />
      <section>
        <h1 className="p-24-semibold text-dark-100">Manage Created Trips</h1>
        <div className="trip-grid">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Trips;
