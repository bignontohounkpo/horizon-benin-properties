import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { MOCK_PROPERTIES } from "@/lib/mockData";
import { CATEGORY_LABELS, DISTRICTS } from "@/lib/constants";
import { useDebounce } from "@/hooks/useDebounce";
import PropertyCard from "@/components/properties/PropertyCard";
import type { OfferType, PropertyCategory } from "@/types/property";

/** Annonces page with filters and property grid */
const AnnoncesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search);

  const offerType = (searchParams.get("type") as OfferType) || undefined;
  const category = (searchParams.get("category") as PropertyCategory) || undefined;
  const district = searchParams.get("district") || undefined;

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (offerType && p.offerType !== offerType) return false;
      if (category && p.category !== category) return false;
      if (district && p.district !== district) return false;
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [offerType, category, district, debouncedSearch]);

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
            Toutes nos annonces immobilières
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de biens soigneusement vérifiés à Cotonou et au Bénin.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-card p-4 md:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Rechercher un bien"
            />
          </div>

          {/* Offer type */}
          <select
            value={offerType ?? ""}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Type d'offre"
          >
            <option value="">Louer / Vendre</option>
            <option value="louer">À louer</option>
            <option value="vendre">À vendre</option>
          </select>

          {/* Category */}
          <select
            value={category ?? ""}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Catégorie"
          >
            <option value="">Toutes catégories</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* District */}
          <select
            value={district ?? ""}
            onChange={(e) => updateFilter("district", e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Quartier"
          >
            <option value="">Tous quartiers</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Aucun bien ne correspond à votre recherche.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} bien{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AnnoncesPage;
