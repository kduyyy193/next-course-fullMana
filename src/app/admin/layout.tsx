import { Navigation, NavigationLink } from '@/components/Navigation';
import React from 'react'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation>
        <NavigationLink href="/admin">Dashboard</NavigationLink>
        <NavigationLink href="/admin/customers">Customers</NavigationLink>
        <NavigationLink href="/admin/products">Products</NavigationLink>
        <NavigationLink href="/admin/sales">Sales</NavigationLink>
      </Navigation>
      <div className='container my-6'>
        {children}
      </div>
    </>
  );
}
