"use server"

import { prisma } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  userId: string
  barbershopId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await prisma.booking.create({
    data: params,
  })

  revalidatePath(`/barbershops/${params.barbershopId}`)
}
