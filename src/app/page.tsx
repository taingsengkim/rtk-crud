"use client";
import ButtonComponent from "@/components/ui/ButtonComponent";
import GetCountComponent from "@/components/ui/GetCountComponent";

import { authClientKeyCloak, signIn } from "@/lib/auth-client";

export default function Home() {
  async function handleKeycloakLogin() {
    await authClientKeyCloak.signIn.oauth2({
      providerId: "keycloak",
      callbackURL: "http://localhost:3000",
    });
  }
  async function handleKeycloakSignOut() {
    await authClientKeyCloak.signOut();
  }
  const handleSignInWithGoogle = async () => {
    await signIn();
  };
  const handleSignOutWithGoogle = () => {};
  return (
    <div>
      <ButtonComponent />
      <GetCountComponent />
      <div>
        <button className="p-5 bg-green-200" onClick={handleKeycloakLogin}>
          Keycloak
        </button>
        <button className="p-5 bg-red-200" onClick={handleKeycloakSignOut}>
          Keycloak Sign Out
        </button>
        <button className="p-5 bg-green-200" onClick={handleSignInWithGoogle}>
          Sign In
        </button>
        <button className="p-5 bg-red-200" onClick={handleSignOutWithGoogle}>
          Sign Out
        </button>
      </div>
    </div>
  );
  //  <Card className="max-w-sm">
  //       <CardHeader>
  //         <CardTitle>Project Overview</CardTitle>
  //         <CardDescription>
  //           Track progress and recent activity for your Next.js app.
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         Your design system is ready. Start building your next component.
  //       </CardContent>
  //     </Card>
  //   );
}
