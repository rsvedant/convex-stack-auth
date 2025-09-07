import { query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      return null;
    }

    return {
      id: identity.tokenIdentifier,
      name: identity.name,
      email: identity.email,
      emailVerified: identity.emailVerified,
      pictureUrl: identity.pictureUrl,
    };
  },
});

export const getAuthenticatedMessage = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return `Hello ${identity.name || identity.email || "authenticated user"}! You are successfully authenticated with Stack Auth + Convex.`;
  },
});
