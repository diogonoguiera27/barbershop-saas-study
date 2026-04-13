"use server"

import { prisma } from "@/app/_lib/prisma"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await prisma.booking.create({
    data: params,
  })
}
