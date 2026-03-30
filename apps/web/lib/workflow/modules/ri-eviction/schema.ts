import { z } from "zod";

export const riEvictionAnswersSchema = z.object({
  role: z.enum(["tenant", "landlord", ""]),
  noticeReceived: z.boolean().nullable(),
  noticeType: z.enum([
    "nonpayment",
    "lease_violation",
    "no_cause",
    "unknown",
    "",
  ]),
  daysSinceNotice: z.number().int().min(0).nullable(),
  courtFiled: z.boolean().nullable(),
  hearingDateKnown: z.boolean().nullable(),
  judgmentEntered: z.boolean().nullable(),
  habitabilityConcern: z.boolean().nullable(),
  lockoutOrShutoff: z.boolean().nullable(),
  stayOrLeave: z.enum(["stay", "leave", "unsure", ""]),
  documentsAvailable: z.enum(["some", "none", "unsure", ""]),
});

export type RiEvictionAnswersInput = z.infer<typeof riEvictionAnswersSchema>;

export function stepSchema(stepKey: string) {
  const base = riEvictionAnswersSchema.partial();
  switch (stepKey) {
    case "role":
      return z.object({ role: z.enum(["tenant", "landlord"]) });
    case "notice":
      return z
        .object({
          noticeReceived: z.boolean(),
          noticeType: z
            .enum(["nonpayment", "lease_violation", "no_cause", "unknown"])
            .optional(),
          daysSinceNotice: z.number().int().min(0).optional().nullable(),
        })
        .superRefine((val, ctx) => {
          if (val.noticeReceived !== true) return;
          if (!val.noticeType) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Select a notice type.",
              path: ["noticeType"],
            });
          }
          if (
            val.daysSinceNotice === null ||
            val.daysSinceNotice === undefined
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Enter approximately how many days ago you received the notice.",
              path: ["daysSinceNotice"],
            });
          }
        });
    case "court":
      return z
        .object({
          courtFiled: z.boolean(),
          hearingDateKnown: z.boolean().optional().nullable(),
          judgmentEntered: z.boolean().optional().nullable(),
        })
        .superRefine((val, ctx) => {
          if (val.courtFiled !== true) return;
          if (
            val.hearingDateKnown === null ||
            val.hearingDateKnown === undefined
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Indicate whether a hearing date is scheduled.",
              path: ["hearingDateKnown"],
            });
          }
          if (
            val.judgmentEntered === null ||
            val.judgmentEntered === undefined
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "Indicate whether a judgment or order has been entered.",
              path: ["judgmentEntered"],
            });
          }
        });
    case "conditions":
      return z.object({
        habitabilityConcern: z.boolean({
          required_error: "Please answer habitability / repairs.",
        }),
        lockoutOrShutoff: z.boolean({
          required_error: "Please answer lockout / utility shutoff.",
        }),
      });
    case "goals":
      return z.object({
        stayOrLeave: z.enum(["stay", "leave", "unsure"]),
        documentsAvailable: z.enum(["some", "none", "unsure"]),
      });
    default:
      return base;
  }
}
