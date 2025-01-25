
import ChartContainer from './containers/ChartContainer';

const MainChart = ({ showButtonsPanel }) => {
  return (
    <>
      <ChartContainer
        showButtonsPanel={showButtonsPanel}        
      />
    </>
  );
};

export default MainChart;
