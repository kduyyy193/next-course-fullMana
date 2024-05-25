import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber } from '@/lib/formatters'
import React from 'react'
import { getProductData, getSalesData, getUserData } from './actions'

export default async function Page() {

    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
            <DashboardCard
                title='Customers'
                subtitle={`${formatNumber((salesData.numberOfSales))} Orders`}
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard
                title="Customers"
                subtitle={`${formatCurrency(
                    userData.averageValuePerUser
                )} Average Value`}
                body={formatNumber(userData.userCount)}
            />
            <DashboardCard
                title="Active Products"
                subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
                body={formatNumber(productData.activeCount)}
            />
        </div>
    )
}

type DashboardCardProps = {
    title: string;
    subtitle: string;
    body: string;
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}