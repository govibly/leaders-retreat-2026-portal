"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getStripeServer } from "@/lib/stripe/server";

function getAmountInCents(formData: FormData) {
  const rawAmount = formData.get("amount");

  if (typeof rawAmount !== "string") {
    return null;
  }

  const numericAmount = Number(rawAmount);

  if (!Number.isFinite(numericAmount) || numericAmount < 5) {
    return null;
  }

  return Math.round(numericAmount * 100);
}

export async function createDonationCheckoutSession(formData: FormData) {
  const amountInCents = getAmountInCents(formData);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const currency = process.env.STRIPE_DONATION_CURRENCY ?? "cad";

  if (!amountInCents) {
    redirect("/?donation=invalid");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Please%20sign%20in%20before%20making%20a%20donation.");
  }

  let sessionUrl = `${siteUrl}/?donation=unavailable`;

  try {
    const stripe = getStripeServer();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      customer_email: user.email ?? undefined,
      success_url: `${siteUrl}/?donation=success`,
      cancel_url: `${siteUrl}/?donation=canceled`,
      metadata: {
        supabase_user_id: user.id,
        church_branch: String(user.user_metadata?.church_branch ?? ""),
        donation_type: "general-support",
      },
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "ANFGC Retreat Support Donation",
              description:
                "Supports the Leader's Retreat audio library and future ministry resources.",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
    });

    if (session.url) {
      sessionUrl = session.url;
    }
  } catch {
    redirect("/?donation=unavailable");
  }

  redirect(sessionUrl);
}