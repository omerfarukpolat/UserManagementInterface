import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  @media (max-width: 600px) {
    max-width: 100%;
    box-sizing: border-box;
  }
`;
export const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
`;
export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;
export const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  @media (max-width: 600px) {
    max-width: 100%;
  }
`;
export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  height: 48px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    max-width: 100%;
  }
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.2rem;
`;
export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;
export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  color: #333;
  border: 1.5px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #e0e7ff;
  }
`;
export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #5a6fd8;
  }
`;

export const CustomCheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const StyledCheckbox = styled.span<{ checked: boolean }>`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${props => (props.checked ? '#667eea' : '#fff')};
  border: 2px solid #667eea;
  border-radius: 5px;
  transition:
    background 0.2s,
    border-color 0.2s;
  position: relative;
  box-sizing: border-box;

  &:after {
    content: '';
    display: ${props => (props.checked ? 'block' : 'none')};
    position: absolute;
    left: 5px;
    top: 1px;
    width: 6px;
    height: 12px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;
