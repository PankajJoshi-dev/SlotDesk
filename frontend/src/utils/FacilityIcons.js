import {
  BookOpen,
  Building2,
  Dumbbell,
  GraduationCap,
  Utensils,
  Palette,
  Car,
  Users,
  Trophy,
  Monitor,
  CalendarDays,
  Gamepad2,
} from "lucide-react";

const facilityIcons = {
  Sports: Trophy,
  Fitness: Dumbbell,
  Recreation: Gamepad2,
  Academic: GraduationCap,
  Study: BookOpen,
  Meeting: Users,
  Events: CalendarDays,
  Arts: Palette,
  Workspace: Monitor,
  Dining: Utensils,
  Parking: Car,
  Other: Building2,
};

function getFacilityIcon(booking) {
  return facilityIcons[booking?.facility?.category] || Building2;
}

export default getFacilityIcon;
