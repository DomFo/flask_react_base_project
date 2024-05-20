import { ReactElement } from 'react';

import PollIcon from '@mui/icons-material/Poll';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export interface Nav {
    title: string;
    route: string;
    icon: ReactElement;
}



const userNavs: Nav[] = [
    {
        title: "Dashboard",
        icon: <PollIcon />,
        route: "/dashboard"
    },
    {
        title: "Athletes",
        icon: <GroupsIcon />,
        route: "/athletes"
    },
]


const adminNavs: Nav[] = [
    {
        title: "Admin Area",
        icon: <AdminPanelSettingsIcon />,
        route: "/admin"
    }
]


export const getNavs = (role: string): Nav[] => {
    if (role === "USER") return userNavs;
    if (role === "ADMIN") return [...userNavs, ...adminNavs];
    return [];
}