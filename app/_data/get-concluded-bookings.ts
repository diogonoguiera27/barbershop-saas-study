"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { prisma } from "@/app/_lib/prisma"

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return []
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    return []
  }

  return prisma.booking.findMany({
    where: {
      userId: user.id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })
}
