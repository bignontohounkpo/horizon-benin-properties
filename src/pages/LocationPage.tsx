"use client"

import AnnoncesPage from "./AnnoncesPage"

/** Location page — Annonces page pre-filtered to "louer" */
const LocationPage = () => {
  return (
    <AnnoncesPage
      forcedOfferType="louer"
      title="Biens à louer"
      description="Découvrez notre sélection de biens à louer soigneusement vérifiés à Cotonou et au Bénin."
      hideOfferTypeFilter
      basePath="/location"
    />
  )
}

export default LocationPage
