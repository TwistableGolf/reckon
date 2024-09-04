import { signIn, signOut } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
} 

export function SignOut()
{
    return (
        <form
        action={async () => {
            "use server"
            await signOut()
        }}
        >
        <button type="submit">Signout</button>
        </form>
    )
}