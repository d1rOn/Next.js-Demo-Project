import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';

import Button from '~/components/UI/Button/Button';
import Checkbox from '~/components/UI/Form/Checkbox/Checkbox';
import FileInput from '~/components/UI/Form/FileInput/FileInput';
import FormMessage from '~/components/UI/Form/FormMessage/FormMessage';
import Input from '~/components/UI/Form/Input/Input';
import Radio from '~/components/UI/Form/Radio/Radio';
import RadioGroup from '~/components/UI/Form/RadioGroup/RadioGroup';
import Selectbox from '~/components/UI/Form/Selectbox/Selectbox';
import Textarea from '~/components/UI/Form/Textarea/Textarea';

import styles from './ContactForm.module.scss';

import yup from '~/functions/yup';

export interface IData {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  help_type: string;
  preferred_contact_method: string;
  about: string;
  receive_communications: string;
  file: string;
  lang?: string;
}

async function send(data: IData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
}

const selectOptions = [
  {
    value: '1',
    name: 'Office rental & CoWorking',
  },
  {
    value: '2',
    name: 'Partnership',
  },
  {
    value: '3',
    name: 'Job application',
  },
  {
    value: '4',
    name: 'Corporate',
  },
  {
    value: '5',
    name: 'Press',
  },
  {
    value: '6',
    name: 'Organize an event',
  },
  {
    value: '7',
    name: 'Other request',
  },
];

const ContactForm: React.FC = () => {
  const router = useRouter();
  const phoneRegEx =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

  const validationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(phoneRegEx, 'Incorrect input')
      .required('Required!'),
    email: yup.string().email('Incorrect input').required('Required!'),
    firstName: yup
      .string()
      .min(2, 'Incorrect input')
      .max(20, 'Incorrect input')
      .required('Required!'),
    lastName: yup
      .string()
      .min(2, 'Incorrect input')
      .max(20, 'Incorrect input')
      .required('Required!'),
    password: yup.string().required('Required!'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    helpType: yup.string().required('Required!'),
    contactPref: yup.string().required('Required!'),
    about: yup.string().required('Required!'),
    file: yup
      .mixed()
      // @ts-expect-error: This is custom method
      .maxFileSize(
        process.env.NEXT_PUBLIC_CONTACT_FORM_FILE_SIZE_LIMIT,
        'The file is too large. Max size is',
      ),
  });

  const onFormSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    const formData = {
      phone: values.phoneNumber,
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      help_type: values.helpType,
      preferred_contact_method: values.contactPref,
      about: values.about,
      receive_communications: values.argeement,
      file: values.file,
      lang: router.locale,
    };

    return send(formData)
      .then(() => {
        actions.setErrors({});
        actions.resetForm();
        actions.setStatus({ sended: 'ok' });
        setTimeout(() => {
          actions.setStatus(false);
        }, 5000);
      })
      .catch(() => {
        actions.setStatus(false);
        actions.setErrors({ serverResponse: 'error' });
      });
  };

  return (
    <div className='section'>
      <div className='container'>
        <div className={styles.formBox}>
          <h1>Registration</h1>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              helpType: '',
              file: null,
              password: '',
              passwordConfirmation: '',
              about: '',
              contactPref: '',
              argeement: false,
            }}
            onSubmit={(values, actions) =>
              onFormSubmit(values, actions as FormikHelpers<FormikValues>)
            }
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting, status, errors }) => (
              <Form
                onSubmit={handleSubmit}
                className={classNames(styles.form, 'darkForm')}
              >
                <fieldset
                  style={{
                    gridArea: 'firstName',
                  }}
                >
                  <Input
                    type='text'
                    label='First name'
                    name='firstName'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'lastName',
                  }}
                >
                  <Input
                    type='text'
                    label='Last name'
                    name='lastName'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'email',
                  }}
                >
                  <Input type='text' label='Email' name='email' required />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'phoneNumber',
                  }}
                >
                  <Input
                    type='text'
                    label='Phone number'
                    name='phoneNumber'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'helpType',
                  }}
                >
                  <Selectbox
                    items={selectOptions}
                    shownValue={(item) => `${item.name}`}
                    name='helpType'
                    label='What can we help you with?'
                    placeholder='Please select'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'contactPref',
                  }}
                >
                  <RadioGroup
                    name='contactPref'
                    className={styles.radios}
                    label='Preferred contact method'
                    required
                  >
                    <Radio value='email' label='Email' />
                    <Radio value='phone' label='Phone' />
                  </RadioGroup>
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'file',
                  }}
                >
                  <FileInput name='file' />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'password',
                  }}
                >
                  <Input
                    type='password'
                    label='Password'
                    name='password'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'passwordConfirmation',
                  }}
                >
                  <Input
                    type='password'
                    label='Confirm password'
                    name='passwordConfirmation'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'about',
                  }}
                >
                  <Textarea
                    label='About'
                    placeholder='Your information'
                    name='about'
                    required
                  />
                </fieldset>
                <fieldset
                  style={{
                    gridArea: 'argeement',
                  }}
                >
                  <Checkbox
                    name='argeement'
                    label='I agree to receive other communications from us.'
                  />
                </fieldset>
                <fieldset
                  className={styles.submitButtonContainer}
                  style={{
                    gridArea: 'submit',
                  }}
                >
                  <Button text='Submit' type='submit' pending={isSubmitting} />
                </fieldset>
                <FormMessage
                  errors={errors}
                  status={status}
                  errorMessage='An error has occurred. Please try again'
                  successMessage='Thanks for submitting the form.'
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
