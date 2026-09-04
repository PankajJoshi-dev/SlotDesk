import SearchBar from "./components/Searchbar";
import FilterSection from "./components/FilterSection";
import FacilityList from "./components/FacilityList";

function BrowseFacilities() {
  return (
    <div>
      <div className="flex flex-row justify-center items-center py-4">
        <SearchBar />
      </div>
      <FilterSection />
      <FacilityList />
    </div>
  );
}

export default BrowseFacilities;
