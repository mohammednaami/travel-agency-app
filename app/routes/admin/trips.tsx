import { Header } from 'components'
import React from 'react'

const Trips = () => {
  return (
    <main className="dashboard wrapper">
      <Header
        title="Trips"
        description="View and manage all trips AI-Generated"
        ctaText="Create New Trip"
        ctaLink="/trips/create"
      />
      </main>
  )
}

export default Trips