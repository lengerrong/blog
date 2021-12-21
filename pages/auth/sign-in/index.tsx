import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import { Card, DividerWithText, Link as ALink, SigninForm } from 'ui'
import Link from 'next/link'

import { getSession, signIn } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

const Signin = () => {
  const onSubmit = (values: any) => {
    signIn('credentials', {
      callbackUrl: '/ghost',
      ...values
    })
  }
  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH='100vh'
      py='12'
      px={{ base: '4', lg: '8' }}
    >
      <Box maxW='md' mx='auto'>
        <Heading textAlign='center' size='xl' fontWeight='extrabold'>
          Sign in to your account
        </Heading>
        <Text mt='4' mb='8' align='center' maxW='md' fontWeight='medium'>
          <Text as='span'>Don&apos;t have an account?</Text>
          <Link href='/auth/sign-up'>
            <ALink href='/auth/sign-up'>Sign Up</ALink>
          </Link>
        </Text>
        <Card>
          <SigninForm onSubmit={onSubmit} />
          <DividerWithText mt='6'>or continue with</DividerWithText>
          <SimpleGrid mt='6' columns={3} spacing='3'>
            <Button
              color='currentColor'
              variant='outline'
              onClick={() =>
                signIn('twitter', {
                  callbackUrl: '/ghost'
                })
              }
            >
              <VisuallyHidden>Login with Twitter</VisuallyHidden>
              <FaTwitter />
            </Button>
            <Button
              color='currentColor'
              variant='outline'
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/ghost'
                })
              }
            >
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button
              color='currentColor'
              variant='outline'
              onClick={() =>
                signIn('github', {
                  callbackUrl: '/ghost'
                })
              }
            >
              <VisuallyHidden>Login with Github</VisuallyHidden>
              <FaGithub />
            </Button>
          </SimpleGrid>
        </Card>
      </Box>
    </Box>
  )
}

export default Signin

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/ghost',
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
