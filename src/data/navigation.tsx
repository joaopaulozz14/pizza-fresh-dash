import { NavItem } from "../components/Menu/types";
import { Home, Settings } from "../assets/icons";
import { RoutePath } from "../types/routes";

export const navigationItems: NavItem[] = [
    {
        icon: <Home />,
        path: RoutePath.HOME,
    },
    {
        icon: <Settings />,
        path: RoutePath.SETTINGS,
    }
];
