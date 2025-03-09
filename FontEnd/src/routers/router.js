import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@components/HomePage/HomePage'))
    },
    {
        path: '/shop',
        component: lazy(() => import('@components/Booking/Booking'))
    },
    {
        path: '/shop/:ProductName',
        component: lazy(() => import('@components/Booking/Components/DetailProducts/DetailProduct'))
    },


]

export default routers;

