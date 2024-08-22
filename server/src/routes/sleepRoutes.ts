import { Router, Request, Response } from "express";
import { z } from "zod";
import { Sleep } from "../models/Sleep";
import { User } from "../models/User";

const router = Router();

const sleepEntrySchema = z.object({
  userName: z.string().min(1, "Username is required"),
  gender: z.string().min(1, "Gender is required"),
  sleepDuration: z.number().min(0, "Sleep duration must be at least 0").max(24, "Sleep duration must be at most 24"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd"),
});

interface SleepEntryRequestBody {
  userName: string;
  gender: string;
  sleepDuration: number;
  date: string;
}

interface SleepEntryParams {
  userName: string;
}

router.get("/sleep-entries/:userName/weekly-summary", async (req: Request<SleepEntryParams>, res: Response) => {
  const validation = sleepEntrySchema.pick({ userName: true }).safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { userName } = req.params;
  const sleepEntries = await Sleep.findMany({
    where: { userName },
    orderBy: { date: "desc" },
    take: 7,
  });
  res.send(sleepEntries);
});

router.post("/sleep-entries", async (req: Request<SleepEntryRequestBody>, res: Response) => {
  const validation = sleepEntrySchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { userName, gender, sleepDuration, date } = req.body;

  // Check if the user exists
  let user = await User.findUnique({ where: { userName } });

  // If user does not exist, create a new user
  if (!user) {
    user = await User.create({
      data: { userName, gender },
    });
  }

  // Create the sleep entry
  const sleepEntry = await Sleep.create({
    data: { userName, sleepDuration, date: new Date(date) },
  });

  res.status(201).json({ message: "Entry created successfully", sleepEntry });
});

export default router;