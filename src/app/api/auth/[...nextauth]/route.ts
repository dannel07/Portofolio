import { handlers } from "@/lib/auth";

export const runtime = 'nodejs';

const { GET: AuthGET, POST: AuthPOST } = handlers;

export { AuthGET as GET, AuthPOST as POST };
