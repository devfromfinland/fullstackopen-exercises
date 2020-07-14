import React, { useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { EntryInput2, HealthCheckRating, EntryType, HealthRatingOption, EntryTypeOption } from '../types';
import { Formik, Form, Field } from 'formik';
import { TextField, SelectEntryTypeField, SelectHealthRatingField } from './FormField';
import { DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { isDate } from '../utils/helpers';

interface Props {
  onSubmit: (values: EntryInput2) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: 'HealthCheck', label: 'Health Check'},
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare'},
  { value: 'Hospital', label: 'Hospital'},
];

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' }
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState<EntryType>('HealthCheck');
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: type,
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        dischargeDate: '',
        criteria: '',
        healthCheckRating: 0,
        employerName: '',
        startDate: '',
        endDate: ''
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const dateFormatError = 'Incorrect date format. Correct form: YYYY-MM-DD';
        const errors: { [field: string]: string } = {};

        if (type !== values.type) {
          setType(values.type);
        }

        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = dateFormatError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (type) {
          case 'HealthCheck':
            break;

          case 'Hospital':
            if (!values.dischargeDate) {
              errors.dischargeDate = requiredError;
            } else if (!isDate(values.dischargeDate)) {
              errors.dischargeDate = dateFormatError;
            }

            if (!values.criteria) {
              errors.criteria = requiredError;
            }
            break;

          case 'OccupationalHealthcare':
            if (!values.employerName) {
              errors.employerName = requiredError;
            }

            if (values.startDate) {
              if (!isDate(values.startDate)) {
                errors.startDate = dateFormatError;
              } else {
                if (!values.endDate) {
                  errors.endDate = 'Start date and end date must go together';
                }
              }
            }
            
            if (values.endDate) {
              if (!isDate(values.endDate)) {
                errors.endDate = dateFormatError;
              } else {
                if (!values.startDate) {
                  errors.startDate = 'Start date and end date must go together';
                }
              }
            }
            break;

          default:
            break;
        }

        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <SelectEntryTypeField
              label='Entry type'
              name='type'
              options={entryTypeOptions}
            />
            <Field
              label='Entry date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />

            { type === 'HealthCheck' && 
              <SelectHealthRatingField
                label='Health Check Rating'
                name='healthCheckRating'
                options={healthRatingOptions}
              />
            }

            { type === 'OccupationalHealthcare' && 
              <>
                <Field
                  label='Employer Name'
                  placeholder='Employer Name'
                  name='employerName'
                  component={TextField}
                />
                <Field
                  label='Start date of sick leave'
                  placeholder='YYYY-MM-DD'
                  name='startDate'
                  component={TextField}
                />
                <Field
                  label='End date of sick leave'
                  placeholder='YYYY-MM-DD'
                  name='endDate'
                  component={TextField}
                />
              </>
            }

            { type === 'Hospital' && 
              <>
                <Field
                  label='Discharge date'
                  placeholder='YYYY-MM-DD'
                  name='dischargeDate'
                  component={TextField}
                />
                <Field
                  label='Discharge criteria'
                  placeholder='Criteria'
                  name='criteria'
                  component={TextField}
                />
              </>
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
      
    </Formik>
  );
};

export default AddEntryForm;