import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { User } from '../../types/user.types';
import Modal from '../../components/Modal';
import {
  UserInfoBox,
  DetailsButton,
  MapWrapper,
  ModalDetailsList,
} from './UserDetails.styled';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type UserWithCoords = User & {
  latitude?: number;
  longitude?: number;
  active?: boolean;
};

type UserDetailsPageComponentProps = {
  user: UserWithCoords;
};

const UserDetailsPageComponent: React.FC<UserDetailsPageComponentProps> = ({
  user,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lat = user.latitude ?? 39.92;
  const lng = user.longitude ?? 32.85;

  return (
    <div>
      <UserInfoBox>
        <h2 style={{ marginBottom: 16 }}>{user.name}</h2>
        <div style={{ marginBottom: 8 }}>
          <b>Email:</b> {user.email}
        </div>
        <DetailsButton onClick={() => setIsModalOpen(true)}>
          Details
        </DetailsButton>
      </UserInfoBox>
      <MapWrapper>
        <MapContainer
          center={[lat, lng] as [number, number]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[lat, lng]}>
            <Popup>
              {user.name}
              <br />
              {user.email}
            </Popup>
          </Marker>
        </MapContainer>
      </MapWrapper>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>User Details</h2>
        <ModalDetailsList>
          <li>
            <b>ID:</b> {user.id}
          </li>
          <li>
            <b>Name:</b> {user.name}
          </li>
          <li>
            <b>Email:</b> {user.email}
          </li>
          <li>
            <b>Role:</b> {user.role}
          </li>
          <li>
            <b>Creation Date:</b> {user.creationDate}
          </li>
          {user.latitude !== undefined && (
            <li>
              <b>Latitude:</b> {user.latitude}
            </li>
          )}
          {user.longitude !== undefined && (
            <li>
              <b>Longitude:</b> {user.longitude}
            </li>
          )}
          {user.active !== undefined && (
            <li>
              <b>Active:</b> {user.active ? 'Yes' : 'No'}
            </li>
          )}
        </ModalDetailsList>
      </Modal>
    </div>
  );
};

export default UserDetailsPageComponent;
