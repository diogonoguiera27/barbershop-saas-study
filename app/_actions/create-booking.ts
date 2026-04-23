"use server"

import { prisma } from "@/app/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  barbershopId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("usuario nao Autenticado")
  }

  let user = await prisma.user.findFirst({
    where: { email: session.user.email },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name,
      },
    })
  }

  await prisma.booking.create({
    data: { ...params, userId: user.id },
  })

  revalidatePath(`/barbershops/${params.barbershopId}`)
  revalidatePath("/bookings")
}
