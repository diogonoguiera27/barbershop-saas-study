"use server"

import { prisma } from "@/app/_lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "../_lib/auth"

export const deleteBooking = async (bookingId: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("usuario nao Autenticado")
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    throw new Error("usuario nao encontrado")
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId: user.id,
    },
  })

  if (!booking) {
    throw new Error("reserva nao encontrada")
  }

  await prisma.booking.delete({
    where: {
      id: booking.id,
    },
  })
  revalidatePath("/bookings")
}
