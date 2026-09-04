import SearchBar from "./components/Searchbar";
import BookingFilters from "./components/BookingFilters";
import BookingList from "./components/BookingList";

function FacilityBookings() {
  return (
    <div>
      <div className="flex flex-row justify-center items-center py-4">
        <SearchBar />
      </div>

      <BookingFilters />
      <BookingList />
    </div>
  );
}

export default FacilityBookings;
