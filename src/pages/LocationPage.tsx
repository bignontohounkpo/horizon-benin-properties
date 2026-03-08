import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import AnnoncesPage from "./AnnoncesPage";

/** Location page — Annonces page pre-filtered to "louer" */
const LocationPage = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("type", "louer");
      return prev;
    });
  }, [setSearchParams]);

  return (
    <>
      <AnnoncesPage />
    </>
  );
};

export default LocationPage;
