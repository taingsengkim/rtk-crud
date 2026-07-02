import {createAuthClient} from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins";

const authClient = createAuthClient();
export const signIn = async ()=>{
    const data = await authClient.signIn.social({
        provider:"google"
    })
    console.log(data)
}
    
export const authClientKeyCloak = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [genericOAuthClient()],
})