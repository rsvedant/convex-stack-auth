export default {
  providers: [
    {
      domain: "https://api.stack-auth.com",
      applicationID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
    },
  ],
};
