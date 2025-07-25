import styled from 'styled-components';

export const UserListContainer = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  @media (max-width: 600px) {
    height: 100vh;
    width: 100vw;
  }
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    padding: 1rem 1rem;
    font-size: 1.2rem;
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

export const ControlsSection = styled.div`
  background: white;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 0.5rem;
    gap: 0.5rem;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 300px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5" stroke="%23667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 20px 20px;
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  @media (max-width: 600px) {
    padding: 0.35rem 2rem 0.35rem 0.7rem;
    font-size: 0.95rem;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => (props.active ? '#667eea' : '#e0e0e0')};
  background: ${props => (props.active ? '#667eea' : 'white')};
  color: ${props => (props.active ? 'white' : '#333')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: #667eea;
    background: ${props => (props.active ? '#5a6fd8' : '#f8f9ff')};
  }
`;

export const PaginationToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ToggleSwitch = styled.label<{ htmlFor?: string }>`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background: #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    background: white;
    transition: transform 0.2s ease;
  }

  input:checked + & {
    background: #667eea;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }

  input:disabled + & {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ToggleInput = styled.input`
  display: none;

  &:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  @media (max-width: 600px) {
    padding: 0;
  }
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  @media (max-width: 600px) {
    overflow-x: auto;
    flex-wrap: nowrap;
    gap: 0.5rem;
    padding: 0.5rem 0.25rem;
    width: 100vw;
    min-width: 390px;
    box-sizing: border-box;
  }
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => (props.active ? '#667eea' : '#e0e0e0')};
  background: ${props => (props.active ? '#667eea' : 'white')};
  color: ${props => (props.active ? 'white' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  &:hover:not(:disabled) {
    border-color: #667eea;
    background: ${props => (props.active ? '#5a6fd8' : '#f8f9ff')};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    padding: 0.35rem 0.7rem;
    font-size: 0.95rem;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #667eea;
`;

export const RoleBadge = styled.span<{ role: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  background: ${props => {
    switch (props.role) {
      case 'admin':
        return '#ff4757';
      case 'moderator':
        return '#ffa502';
      case 'editor':
        return '#2ed573';
      default:
        return '#747d8c';
    }
  }};
  color: white;
`;

export const TableActionButton = styled.button<{
  variant?: 'filled' | 'outlined';
}>`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${({ variant }) =>
    variant === 'outlined'
      ? `
    background: white;
    color: #222;
    border: 2px solid;
    border-color: #667eea;
    border-image-slice: 1;
    box-shadow: none;
    &:hover {
      background: #f8f9ff;
      color: #667eea;
    }
  `
      : `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    &:active {
      transform: translateY(0);
    }
  `}
`;