import React from "react";
import { ErrorMessage, Field, FieldProps } from 'formik';
import { Form } from 'semantic-ui-react';
import { HealthRatingOption, EntryTypeOption } from "../types";

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

type SelectHealthRatingProps = {
  name: string;
  label: string;
  options: HealthRatingOption[];
};

type SelectEntryTypeProps = {
  name: string;
  label: string;
  options: EntryTypeOption[];
};

export const SelectHealthRatingField: React.FC<SelectHealthRatingProps> = ({
  name,
  label,
  options
}: SelectHealthRatingProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectEntryTypeField: React.FC<SelectEntryTypeProps> = ({
  name,
  label,
  options
}: SelectEntryTypeProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);