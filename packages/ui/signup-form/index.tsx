import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from '../password-field'
import { Form, Field } from 'react-final-form'

export interface SignupFormProps {
  onSubmit: (values: any) => void
}
export const SignupForm = ({ onSubmit }: SignupFormProps) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <chakra.form onSubmit={handleSubmit}>
        <Stack spacing='6'>
          <Field name='firstname'>
            {({ input, meta }) => (
              <FormControl id='firstname'>
                <FormLabel>First Name</FormLabel>
                <Input
                  type='text'
                  autoComplete='given-name'
                  required
                  {...input}
                />
              </FormControl>
            )}
          </Field>
          <Field name='lastname'>
            {({ input, meta }) => (
              <FormControl id='lastname'>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type='text'
                  autoComplete='family-name'
                  required
                  {...input}
                />
              </FormControl>
            )}
          </Field>
          <Field name='email'>
            {({ input, meta }) => (
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input type='email' autoComplete='email' required {...input} />
              </FormControl>
            )}
          </Field>
          <Field name='password'>
            {({ input, meta }) => <PasswordField {...input} />}
          </Field>
          <Button type='submit' colorScheme='blue' size='lg' fontSize='md'>
            Sign up
          </Button>
        </Stack>
      </chakra.form>
    )}
  </Form>
)
