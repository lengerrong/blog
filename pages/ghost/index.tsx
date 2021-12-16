import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { getSession, signOut, SessionProvider } from 'next-auth/react'

type GhostProps = {
  session: Session
}
const Ghost = ({ session }: GhostProps) => (
  <SessionProvider session={session} refetchInterval={0}>
    <button onClick={() => signOut({ callbackUrl: '/' })}>sign out</button>

    <h1>API Example</h1>
    <p>The examples below show responses from the example API endpoints.</p>
    <p>
      <em>You must be signed in to see responses.</em>
    </p>
    <h2>Session</h2>
    <p>/api/examples/session</p>
    <iframe src='/api/examples/session' />
    <h2>JSON Web Token</h2>
    <p>/api/examples/jwt</p>
    <iframe src='/api/examples/jwt' />
  </SessionProvider>
)

export default Ghost

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}
