import Sun from "@/assets/icons/Sun.svg";
import Moon from "@/assets/icons/Moon.svg";
import Cloud from "@/assets/icons/Cloud.svg";
import CloudSun from "@/assets/icons/Cloud-Sun.svg";
import CloudMoon from "@/assets/icons/Cloud-Moon.svg";
import CloudDrizzle from "@/assets/icons/Cloud-Drizzle.svg";
export const useIcons = (icon: string) => {
  const icons = {
    "01d": Sun,
    "01n": Moon,
    "02d": CloudSun,
    "02n": CloudMoon,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Cloud,
    "04n": Cloud,
    "10d": CloudDrizzle,
    "10n": CloudDrizzle,
  };

  return icons[icon as keyof typeof icons];
};
