import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

let connections: any = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const connection = {
      response: res,
      cleanup: () => {
        connections = connections.filter((conn: any) => conn !== connection);
      },
    };

    connections.push(connection);

    req.on("close", () => {
      connection.cleanup();
    });

    try {
      const getUsers = await prisma.user.findMany();
      res.status(200).json(getUsers);
    } catch (err) {
      return res.status(403).json({ err: "Error fetching users" });
    }
  }
}

export function triggerUpdates(newData: any) {
  for (const connection of connections) {
    connection.response.status(200).json(newData);
    connection.cleanup();
  }
}