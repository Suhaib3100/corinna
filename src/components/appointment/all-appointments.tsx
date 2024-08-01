import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu'
import React from 'react'
import { DataTable } from '../table'
import { TableCell, TableRow } from '../ui/table'
import { getMonthName } from '@/lib/utils'
import { CardDescription } from '../ui/card'

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string
          } | null
        } | null
        id: string
        email: string
        domainId: string | null
        date: Date
        slot: string
        createdAt: Date
      }[]
    | undefined
}

const AllAppointments = ({ bookings }: Props) => {
  return (
    <DataTable headers={APPOINTMENT_TABLE_HEADER}>
      {bookings ? (
        bookings.map((booking) => (
          <TableRow
            key={booking.id}
            className="transition-transform transform hover:scale-105"
          >
            <TableCell>{booking.email}</TableCell>
            <TableCell>
              <div className="text-lg font-semibold">
                {getMonthName(booking.date.getMonth())} {booking.date.getDate()}{' '}
                {booking.date.getFullYear()}
              </div>
              <div className="text-sm text-gray-500 uppercase">{booking.slot}</div>
            </TableCell>
            <TableCell>
              <div className="text-lg font-semibold">
                {getMonthName(booking.createdAt.getMonth())}{' '}
                {booking.createdAt.getDate()} {booking.createdAt.getFullYear()}
              </div>
              <div className="text-sm text-gray-500">
                {booking.createdAt.getHours()}:{booking.createdAt.getMinutes()}{' '}
                {booking.createdAt.getHours() > 12 ? 'PM' : 'AM'}
              </div>
            </TableCell>
            <TableCell className="text-right text-lg font-semibold">
              {booking.Customer?.Domain?.name || 'N/A'}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <CardDescription>No Appointments</CardDescription>
      )}
    </DataTable>
  )
}

export default AllAppointments
