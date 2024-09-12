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
        return <Page />;
      } else {
        return <Unauthorized />;
      }
    };
  };

