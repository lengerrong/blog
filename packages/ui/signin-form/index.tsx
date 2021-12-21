import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'
import * as React from 'react'
import { Field, Form } from 'react-final-form'
import { PasswordField } from '../password-field'

export interface SigninFormProps {
  onSubmit: (values: any) => void
}
export const SigninForm = ({ onSubmit }: SigninFormProps) => (
  <Form onSubmit={onSubmit}>
    {({ handleSubmit }) => (
      <chakra.form onSubmit={handleSubmit}>
        <Stack spacing='6'>
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
            Sign in
          </Button>
        </Stack>
      </chakra.form>
    )}
  </Form>
)
