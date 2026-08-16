import {
  BookOpen,
  Building2,
  Dumbbell,
  GraduationCap,
  Monitor,
  Music,
  Trophy,
  Users,
} from "lucide-react";

const facilityIcons = {
  Gym: Dumbbell,
  Court: Trophy,
  Library: BookOpen,
  Laboratory: Monitor,
  Auditorium: Music,
  Classroom: GraduationCap,
  "Meeting Room": Users,
};

function getFacilityIcon(booking) {
  return facilityIcons[booking?.facility?.facilityType] || Building2;
}

export default getFacilityIcon;
