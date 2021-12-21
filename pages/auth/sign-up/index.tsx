import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

import { Card, Link as ALink, SignupForm } from 'ui'
import Link from 'next/link'
import {
  fireBaseSignUp,
  fireBaseSendEmailVerification,
  fireBaseGetUserData
} from '../../../utils/api/firebase'

const Signup = () => {
  const onSubmit = (values: any) => {
    console.log(values)
    fireBaseSignUp({
      ...values
    })
      .then((res) => {
        fireBaseSendEmailVerification({
          idToken: res.data.idToken
        })
          .then(() => {
            fireBaseGetUserData({
              idToken: res.data.idToken
            })
              .then((userData) => {
                console.log(userData.data)
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
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
          Sign Up
        </Heading>
        <Card>
          <SignupForm onSubmit={onSubmit} />
          <Text mt='4' mb='8' align='center' maxW='md' fontWeight='medium'>
            <Link href='/auth/sign-in'>
              <ALink href='/auth/sign-up'>
                Already have an account? Sign in
              </ALink>
            </Link>
          </Text>
        </Card>
      </Box>
    </Box>
  )
}

export default Signup
