
import ChartContainer from './containers/ChartContainer';

const MainChart = ({ showButtonsPanel, updateShowButtonsPanel }) => {
  return (
    <>
      <ChartContainer
        showButtonsPanel={showButtonsPanel}
        updateShowButtonsPanel={updateShowButtonsPanel}
      />
    </>
  );
};

export default MainChart;
