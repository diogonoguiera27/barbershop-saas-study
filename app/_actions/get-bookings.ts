"use server"

import { prisma } from "@/app/_lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date, serviceId }: GetBookingsProps) => {
  return await prisma.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
