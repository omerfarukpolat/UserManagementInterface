import styled from 'styled-components';

export const UserInfoBox = styled.div`
  max-width: 600px;
  margin: 32px auto;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
  text-align: center;
`;

export const DetailsButton = styled.button`
  margin-top: 12px;
  padding: 0.5rem 1.2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #5a6fd8;
  }
`;

export const MapWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export const ModalDetailsList = styled.ul`
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
`;
