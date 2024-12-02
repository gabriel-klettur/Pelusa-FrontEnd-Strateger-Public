import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export const fetchAlarms = createAsyncThunk(
  'alarms/fetchAlarms',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {

      //! Simulación del token en localStorage - Deberias implementar tu propio sistema de autenticación
      //! El sistema de autenficacion se realizara utilizando Redux.
      //! Para ello se debera crear un nuevo slice de Redux llamado authSlice.jsx
      //! En este slice se almacenara el token de autenticación y se crearan los thunks necesarios para realizar el login y logout del usuario.

      const simulatedToken = 'your-auth-token-here'; // Reemplaza con un token válido para pruebas
      localStorage.setItem('authToken', simulatedToken);

      // Obtener el token desde localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      // Hacer la solicitud con el encabezado Authorization
      const response = await axios.get(
        `${config.apiURL}/alarms/alarms?limit=${limit}&offset=${offset}&latest=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token
          },
        }
      );

      // Ordenar los datos antes de retornarlos
      return response.data.sort((a, b) => b.id - a.id);
    } catch (error) {
      // Manejar errores y enviar el mensaje al estado de rechazo
      return rejectWithValue(error.message);
    }
  }
);
