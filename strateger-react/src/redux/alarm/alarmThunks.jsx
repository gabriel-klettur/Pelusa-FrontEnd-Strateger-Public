// Path: strateger-react/src/redux/alarm/alarmThunks.jsx

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';
import { selectAlarmsData } from './alarmSelectors';

export const fetchAlarms = createAsyncThunk(
  'alarms/fetchAlarms',
  async ({ limit, offset }, { getState, rejectWithValue }) => {
    try {
      // Obtener las alarmas actuales desde el estado global usando `getState`
      const state = getState();
      const currentData = selectAlarmsData(state); // Obtener las alarmas actuales del Redux store      

      //! Simulación del token en localStorage - Deberías implementar tu propio sistema de autenticación
      //! El sistema de autenticación se realizará utilizando Redux.
      //! Para ello se deberá crear un nuevo slice de Redux llamado authSlice.jsx
      //! En este slice se almacenará el token de autenticación y se crearán los thunks necesarios para realizar el login y logout del usuario.
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

      // Combinar datos nuevos y existentes, eliminando duplicados
      const newData = response.data;
      const combinedData = [...currentData, ...newData];
      
      // Usar Set para eliminar duplicados basados en el ID
      const uniqueData = Array.from(
        new Set(combinedData.map((alarm) => alarm.id))
      ).map((id) => combinedData.find((alarm) => alarm.id === id));

      // Ordenar los datos únicos antes de retornarlos (más reciente primero)
      return uniqueData.sort((a, b) => b.id - a.id);
    } catch (error) {
      // Manejar errores y enviar el mensaje al estado de rechazo
      return rejectWithValue(error.message);
    }
  }
);
