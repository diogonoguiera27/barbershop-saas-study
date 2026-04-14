"use server"

import { prisma } from "@/app/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  userId: string
  barbershopId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("usuario nao Autenticado")
  }

  await prisma.booking.create({
    data: { ...params, userId: session.user.id },
  })

  revalidatePath(`/barbershops/${params.barbershopId}`)
}
