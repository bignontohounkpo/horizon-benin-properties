"use client"

import AnnoncesPage from "./AnnoncesPage"

/** Vente page — Annonces page pre-filtered to "vendre" */
const VentePage = () => {
  return (
    <AnnoncesPage
      forcedOfferType="vendre"
      title="Biens à vendre"
      description="Découvrez notre sélection de biens à vendre soigneusement vérifiés à Cotonou et au Bénin."
      hideOfferTypeFilter
      basePath="/vente"
    />
  )
}

export default VentePage
