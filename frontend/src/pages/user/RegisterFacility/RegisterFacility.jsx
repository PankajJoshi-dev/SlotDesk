import favicon from "/favicon.png";
import RegisterFacilityForm from "./components/RegisterFacilityForm";

function RegisterFacility() {
  return (
    <div className="flex flex-col justify-start items-center gap-4 py-12">
      <img src={favicon} alt="logo" className="h-10" />
      <p className="text-text font-semibold text-lg">Register to SlotDesk</p>
      <RegisterFacilityForm />
    </div>
  );
}

export default RegisterFacility;
