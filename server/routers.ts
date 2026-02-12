import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
          whatsapp: z.string().min(10),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database unavailable");
        }

        try {
          await db.insert(leads).values({
            name: input.name,
            email: input.email,
            whatsapp: input.whatsapp,
            source: "landing_page",
          });

          return {
            success: true,
            message: "Lead capturado com sucesso!",
          };
        } catch (error) {
          console.error("Erro ao criar lead:", error);
          throw new Error("Erro ao salvar lead");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
