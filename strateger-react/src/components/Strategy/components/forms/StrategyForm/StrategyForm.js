// Path: strateger-react/src/components/Strategy/StrategyForm/StrategyForm.js

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Ventanita from '../../../../common/Ventanita'; // Importa Ventanita
import Inputsito from '../../../../common/Inputsito'; // Importa Inputsito
import { saveStrategy } from 'reduxStore/strategy';

const StrategyForm = ({ strategy, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    alarmName: '',
    isOn: false,
    account_name: '',
    account_type: '',
    ticker: 'BTCUSDT.PS',
    description: '',
    onStartDate: '',
    offEndDate: '',
    longEntryOrder: '',
    longCloseOrder: '',
    longEntryIndicator: '',
    longCloseIndicator: '',
    longPyramiding: '',
    longLeverage: '',
    longQuantity: '',
    longTPPerOrder: '',
    longTPGeneral: '',
    longSLPerOrder: '',
    longSLGeneral: '',
    shortEntryOrder: '',
    shortCloseOrder: '',
    shortEntryIndicator: '',
    shortCloseIndicator: '',
    shortPyramiding: '',
    shortLeverage: '',
    shortQuantity: '',
    shortTPPerOrder: '',
    shortTPGeneral: '',
    shortSLPerOrder: '',
    shortSLGeneral: '',
  });

  useEffect(() => {
    if (strategy) {
      setFormState(strategy);
    }
  }, [strategy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const toggleButton = () => {
    setFormState({
      ...formState,
      isOn: !formState.isOn,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adjustedFormState = {
      ...formState,
      onStartDate: formatDateString(formState.onStartDate),
      offEndDate: formatDateString(formState.offEndDate),
      longPyramiding: formState.longPyramiding === '' ? 0 : parseInt(formState.longPyramiding, 10),
      longLeverage: formState.longLeverage === '' ? 0 : parseFloat(formState.longLeverage),
      longQuantity: formState.longQuantity === '' ? 0 : parseFloat(formState.longQuantity),
      longTPPerOrder: formState.longTPPerOrder === '' ? 0 : parseFloat(formState.longTPPerOrder),
      longTPGeneral: formState.longTPGeneral === '' ? 0 : parseFloat(formState.longTPGeneral),
      longSLPerOrder: formState.longSLPerOrder === '' ? 0 : parseFloat(formState.longSLPerOrder),
      longSLGeneral: formState.longSLGeneral === '' ? 0 : parseFloat(formState.longSLGeneral),
      shortPyramiding: formState.shortPyramiding === '' ? 0 : parseInt(formState.shortPyramiding, 10),
      shortLeverage: formState.shortLeverage === '' ? 0 : parseFloat(formState.shortLeverage),
      shortQuantity: formState.shortQuantity === '' ? 0 : parseFloat(formState.shortQuantity),
      shortTPPerOrder: formState.shortTPPerOrder === '' ? 0 : parseFloat(formState.shortTPPerOrder),
      shortTPGeneral: formState.shortTPGeneral === '' ? 0 : parseFloat(formState.shortTPGeneral),
      shortSLPerOrder: formState.shortSLPerOrder === '' ? 0 : parseFloat(formState.shortSLPerOrder),
      shortSLGeneral: formState.shortSLGeneral === '' ? 0 : parseFloat(formState.shortSLGeneral),
    };
    try {
      await dispatch(saveStrategy(adjustedFormState));
      onSave(adjustedFormState);
    } catch (error) {
      console.error('Error saving strategy:', error);
    }
  };

  const formatDateString = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-african_violet-200 rounded-lg p-4 border-4 border-african_violet-300 shadow-md">
      <div className="grid grid-cols-10 gap-4">
        {/* Información de Estrategia ------------------------------------------------------------*/}
        <div className="col-span-3">
          <Ventanita
            titulo="Información de Estrategia"
            contenido={
              <div className="w-96">
                <button
                  type="button"
                  className={`mt-1 w-full border rounded-md shadow-sm p-2 text-center ${
                    formState.isOn ? 'bg-green-500 text-white blink-background' : 'bg-red-500 text-white'
                  }`}
                  onClick={toggleButton}
                >
                  {formState.isOn ? 'ON' : 'OFF'}
                </button>
                <Inputsito
                  label="Nombre de la Alarma"
                  name="alarmName"
                  value={formState.alarmName}
                  onChange={handleChange}
                />
                <Inputsito
                  label="Cuenta"
                  name="account_name"
                  value={formState.account_name}
                  onChange={handleChange}
                />
                <Inputsito
                  label="Tipo de Cuenta"
                  name="account_type"
                  value={formState.account_type}
                  onChange={handleChange}
                />
                <Inputsito
                  label="Ticker"
                  name="ticker"
                  value={formState.ticker}
                  onChange={handleChange}
                />
                <Inputsito
                  label="Descripción"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  type="textarea"
                  className="h-24"
                />
                <Inputsito
                  label="Fecha de Inicio"
                  name="onStartDate"
                  value={formState.onStartDate}
                  onChange={handleChange}
                  type="datetime-local"
                />
                <Inputsito
                  label="Fecha de Fin"
                  name="offEndDate"
                  value={formState.offEndDate}
                  onChange={handleChange}
                  type="datetime-local"
                />
              </div>
            }
          />
        </div>

        {/* Detalles de Long Strategy ------------------------------------------------------------*/}
        <div className="col-span-3">
          <Ventanita
            titulo="Detalles de Long Strategy"
            contenido={
              <div className="grid grid-cols-2 gap-4">
                <Ventanita
                  titulo="Order"
                  contenido={
                    <div>
                      <Inputsito
                        label="Entry Order"
                        name="longEntryOrder"
                        value={formState.longEntryOrder}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Close Order"
                        name="longCloseOrder"
                        value={formState.longCloseOrder}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <Ventanita
                  titulo="Indicator"
                  contenido={
                    <div>
                      <Inputsito
                        label="Entry Indicator"
                        name="longEntryIndicator"
                        value={formState.longEntryIndicator}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Close Indicator"
                        name="longCloseIndicator"
                        value={formState.longCloseIndicator}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <Ventanita
                  titulo="Management"
                  contenido={
                    <div>
                      <Inputsito
                        label="Pyramiding"
                        name="longPyramiding"
                        value={formState.longPyramiding}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Leverage"
                        name="longLeverage"
                        value={formState.longLeverage}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Quantity"
                        name="longQuantity"
                        value={formState.longQuantity}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <Ventanita
                  titulo="Risk Management"
                  contenido={
                    <div>
                      <Inputsito
                        label="TP per Order"
                        name="longTPPerOrder"
                        value={formState.longTPPerOrder}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="TP General"
                        name="longTPGeneral"
                        value={formState.longTPGeneral}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="SL per Order"
                        name="longSLPerOrder"
                        value={formState.longSLPerOrder}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="SL General"
                        name="longSLGeneral"
                        value={formState.longSLGeneral}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
              </div>
            }
          />
        </div>

        {/* Detalles de Short Strategy ------------------------------------------------------------*/}
        <div className="col-span-4">
          <Ventanita
            titulo="Detalles de Short Strategy"
            contenido={
              <div className="grid grid-cols-2 gap-4">
                <Ventanita
                  titulo="Order"
                  contenido={
                    <div>
                      <Inputsito
                        label="Entry Order"
                        name="shortEntryOrder"
                        value={formState.shortEntryOrder}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Close Order"
                        name="shortCloseOrder"
                        value={formState.shortCloseOrder}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <Ventanita
                  titulo="Indicator"
                  contenido={
                    <div>
                      <Inputsito
                        label="Entry Indicator"
                        name="shortEntryIndicator"
                        value={formState.shortEntryIndicator}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Close Indicator"
                        name="shortCloseIndicator"
                        value={formState.shortCloseIndicator}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <Ventanita
                  titulo="Management"
                  contenido={
                    <div>
                      <Inputsito
                        label="Pyramiding"
                        name="shortPyramiding"
                        value={formState.shortPyramiding}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Leverage"
                        name="shortLeverage"
                        value={formState.shortLeverage}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="Quantity"
                        name="shortQuantity"
                        value={formState.shortQuantity}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
                <Ventanita
                  titulo="Risk Management"
                  contenido={
                    <div>
                      <Inputsito
                        label="TP per Order"
                        name="shortTPPerOrder"
                        value={formState.shortTPPerOrder}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="TP General"
                        name="shortTPGeneral"
                        value={formState.shortTPGeneral}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="SL per Order"
                        name="shortSLPerOrder"
                        value={formState.shortSLPerOrder}
                        onChange={handleChange}
                      />
                      <Inputsito
                        label="SL General"
                        name="shortSLGeneral"
                        value={formState.shortSLGeneral}
                        onChange={handleChange}
                      />
                    </div>
                  }
                />
              </div>
            }
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="grid grid-cols-10 gap-4 mt-4">
        <button
          type="submit"
          className="px-4 py-2 font-semibold transition-colors duration-200 shadow-md bg-african_violet-500 text-white rounded col-span-1 hover:bg-african_violet-400"
        >
          Guardar
        </button>
        <button
          type="button"
          className="px-4 py-2 font-semibold transition-colors duration-200 shadow-md bg-gray-500 text-white rounded col-span-1 hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default StrategyForm;

