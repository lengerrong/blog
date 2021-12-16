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
import { Card, DividerWithText, Link, LoginForm } from 'ui'

import { signIn } from 'next-auth/react'

const Signin = () => {
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
          <Link href='#'>Start free trial</Link>
        </Text>
        <Card>
          <LoginForm />
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
