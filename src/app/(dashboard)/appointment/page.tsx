import { onGetAllBookingsForCurrentUser } from '@/actions/appointment'
import AllAppointments from '@/components/appointment/all-appointments'
import InfoBar from '@/components/infobar'
import { Section } from '@/components/section-label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const user = await currentUser()

  if (!user) return null
  const domainBookings = await onGetAllBookingsForCurrentUser(user.id)
  const today = new Date()

  if (!domainBookings)
    return (
      <div className="w-full flex justify-center mt-8">
        <p className="text-xl font-semibold text-gray-700">No Appointments</p>
      </div>
    )

  const bookingsExistToday = domainBookings.bookings.filter(
    (booking) => booking.date.getDate() === today.getDate()
  )

  return (
    <>
      <InfoBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-6 p-6">
        <div className="lg:col-span-2 overflow-y-auto bg-white shadow-lg rounded-lg">
          <AllAppointments bookings={domainBookings?.bookings} />
        </div>
        <div className="col-span-1">
          <Section
            label="Bookings For Today"
            message="All your bookings for today are mentioned below."
          />
          {bookingsExistToday.length ? (
            bookingsExistToday.map((booking) => (
              <Card
                key={booking.id}
                className="rounded-xl overflow-hidden mt-4 bg-white shadow-md transition-transform transform hover:scale-105"
              >
                <CardContent className="p-0 flex">
                  <div className="w-4/12 text-xl bg-gradient-to-r from-yellow-400 to-red-500 text-white py-6 flex justify-center items-center font-bold">
                    {booking.slot}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between w-full p-3 bg-gray-100">
                      <p className="text-sm text-gray-600">
                        Created at
                        <br />
                        {booking.createdAt.getHours()}:{booking.createdAt.getMinutes()}{' '}
                        {booking.createdAt.getHours() > 12 ? 'PM' : 'AM'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Domain
                        <br />
                        {booking.Customer?.Domain?.name || 'N/A'}
                      </p>
                    </div>
                    <Separator orientation="horizontal" />
                    <div className="w-full flex items-center p-3 gap-2">
                      <Avatar>
                        <AvatarFallback>{booking.email[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-700">{booking.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="w-full flex justify-center mt-8">
              <p className="text-xl font-semibold text-gray-700">No Appointments For Today</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Page
