import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import AnnoncesPage from "./AnnoncesPage";

/** Vente page — Annonces page pre-filtered to "vendre" */
const VentePage = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("type", "vendre");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <>
      <AnnoncesPage />
    </>
  );
};

export default VentePage;
