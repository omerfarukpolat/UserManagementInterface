import React, { useState } from 'react';
import { USER_ROLE } from '../../constants/filters';
import {
  Form,
  FormTitle,
  FormGroup,
  Label,
  Input,
  Select,
  ErrorText,
  ButtonGroup,
  CancelButton,
  SubmitButton,
  CustomCheckboxWrapper,
  HiddenCheckbox,
  StyledCheckbox,
} from './AddUserForm.styled';

type AddUserFormProps = {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
  }) => void;
  onCancel: () => void;
};

const initialState = {
  name: '',
  email: '',
  password: '',
  role: USER_ROLE.USER,
  active: true,
};

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = 'Invalid email format.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    else if (!/[A-Z]/.test(form.password))
      newErrors.password = 'Password must contain at least 1 uppercase letter.';
    else if (!/[0-9]/.test(form.password))
      newErrors.password = 'Password must contain at least 1 number.';
    else if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(form.password))
      newErrors.password =
        'Password must contain at least 1 special character ($ & + , : ; = ? @ # | < > . ^ * ( ) % ! - ).';
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Add New User</FormTitle>
      <FormGroup>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <Label>Name*</Label>
        <Input
          type='text'
          name='name'
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </FormGroup>
      <FormGroup>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <Label>Email*</Label>
        <Input
          type='email'
          name='email'
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormGroup>
      <FormGroup>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <Label>Password*</Label>
        <Input
          type='password'
          name='password'
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </FormGroup>
      <FormGroup>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <Label>Role</Label>
        <Select name='role' value={form.role} onChange={handleChange}>
          <option value={USER_ROLE.ADMIN}>Admin</option>
          <option value={USER_ROLE.USER}>User</option>
          <option value={USER_ROLE.MODERATOR}>Moderator</option>
          <option value={USER_ROLE.EDITOR}>Editor</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <CustomCheckboxWrapper>
          <HiddenCheckbox
            name='active'
            checked={form.active}
            onChange={handleChange}
          />
          <StyledCheckbox checked={form.active} />
          Active
        </CustomCheckboxWrapper>
      </FormGroup>
      <ButtonGroup>
        <CancelButton type='button' onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type='submit'>Add User</SubmitButton>
      </ButtonGroup>
    </Form>
  );
};

export default AddUserForm;
