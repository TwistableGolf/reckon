
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { api } from "../../server/trpc/server";
import Unauthorized from "./unauthorized";

export const ProtectedPage = async (Page: React.ComponentType) => {
    return async function WrappedComponent() {
      var session = await auth();
      if(!session){
        return <Unauthorized />;
      }
      var user = await api.user.snippetBySession();
  
      if (user) {
        return <Page/>;
      } else {
        redirect("/onboarding");
      }
    };
  };

export const useAuth = async ()=>{
  var session = await auth();
  if (session) {
    const user = await api.user.snippetBySession();
    if(user)
    {
      return {
        authed: true,
        user
      }
    }

  }
  return{
    authed: false,
    user: null
  }
};