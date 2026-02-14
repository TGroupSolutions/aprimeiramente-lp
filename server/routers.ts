import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { leads } from "../drizzle/schema";
import { sendWelcomeEmail, sendLeadNotificationToOwner } from "./email";

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
    testEmail: publicProcedure.mutation(async () => {
      try {
        // Enviar email de teste
        await sendLeadNotificationToOwner({
          name: "Teste de Email",
          email: "teste@example.com",
          whatsapp: "(11) 99999-9999",
        });

        return {
          success: true,
          message: "Email de teste enviado para vanessa.barpontes@gmail.com",
        };
      } catch (error) {
        console.error("Erro ao enviar email de teste:", error);
        throw new Error("Erro ao enviar email de teste");
      }
    }),
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
          // Salvar lead no banco de dados
          await db.insert(leads).values({
            name: input.name,
            email: input.email,
            whatsapp: input.whatsapp,
            source: "landing_page",
          });

          // URL do PDF
          const pdfUrl = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663029763692/DpkEZiNKWaemYiGh.pdf";

          // Enviar email de boas-vindas ao lead
          const emailSent = await sendWelcomeEmail({
            to: input.email,
            subject: "Seu Ebook Missão Águia está pronto! 🦅",
            name: input.name,
            whatsapp: input.whatsapp,
            pdfUrl,
          });
          
          if (!emailSent) {
            console.warn('[Leads] Email de boas-vindas não foi enviado para:', input.email);
          } else {
            console.log('[Leads] Email de boas-vindas enviado para:', input.email);
          }

          // Enviar notificação ao proprietário
          const notificationSent = await sendLeadNotificationToOwner({
            name: input.name,
            email: input.email,
            whatsapp: input.whatsapp,
          });
          
          if (!notificationSent) {
            console.warn('[Leads] Notificação não foi enviada para o proprietário');
          } else {
            console.log('[Leads] Notificação enviada para o proprietário');
          }

          // Notificar o proprietário em tempo real (se houver sistema de notificação)
          // TODO: Implementar notificação em tempo real via WebSocket

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
