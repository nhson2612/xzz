import './App.css';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField'

const initialValues = {
  name: '',
  email: '',
  description: '',
  phoneNumbers: [''],
  other: {
    facebook: '',
    twitter: '',
  }
};

const onSubmit = values => {
  console.log('Form data', values);
};

const validate = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  description: Yup.string().required('Required'),
});

function App() {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validate}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >

      <Form>
      <label htmlFor="name">Name</label>
      <Field
       id="name" name="name" type="text"
       />
      <ErrorMessage name="name" />
      <br />
      <label htmlFor="email">Email</label>
      <Field id="email" name="email" type="text"
      />
      <ErrorMessage name="email" />
      <br />
      <Field id="description" name="description">
        {(props) => {
          const { field, meta } = props;
          return (
            <TextField {...field} label='description' variant='outlined' helperText={meta.error} error={Boolean(meta.error)} />
          );
        }}
      </Field>
      <br />
      <label htmlFor="facebook">Facebook</label>
      <Field id="facebook" name="other.facebook" type="text" />
      <br />
      <label htmlFor="twitter">Twitter</label>
      <Field id="twitter" name="other.twitter" type="text" />
      <br />
      <FieldArray id="phNumber">
        {
          (props) => {
            const { push, remove, form } = props;
            const {phoneNumbers} = form.values;
            return (
              <div>
                {
                  phoneNumbers.map((phNumber, index) => (
                    <div key={index}>
                      <Field name={`phoneNumbers[${index}]`} />
                      {
                        index > 0 && <button type="button" onClick={() => remove(index)}> - </button>
                      }
                      <button type="button" onClick={() => push('')}> + </button>
                    </div>
                  ))
                }
              </div>
            );
          }
        }
      </FieldArray>
      <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default App;
