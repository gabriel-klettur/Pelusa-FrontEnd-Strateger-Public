import HorizontalBarChart from "../common/charts/HorizontalBarChart";
import VerticalBarChart from "../common/charts/VerticalBarChart";
import StackedBarChart from "../common/charts/StackedBarChart";
import GroupedBarChart from "../common/charts/GroupedBarChart";
import LineChart from "../common/charts/LineChart";
import MultiaxisLineChart from "../common/charts/MultiaxisLineChart";
import DoughnutChart from "../common/charts/DoughnutChart";
import PolarAreaChart from "../common/charts/PolarAreaChart";
import RadarChart from "../common/charts/RadarChart";
import BubbleChart from "../common/charts/BubbleChart";
import MultitypeChart from "../common/charts/MultitypeChart";
import ScatterChart from "../common/charts/ScatterChart";
import ChartEvents from "../common/charts/ChartEvents";
import GetChartRef from "../common/charts/GetChartRef";
import GradientChart from "../common/charts/GradientChart";
import PieChart from "../common/charts/PieChart";

import Ventanita from "../common/Ventanita";

const ConfigComponent = () => {
    return(
        <div className="bg-white pl-3">
            <div className="grid grid-cols-3 mt-3">
                <div className="col-span-1">
                    <Ventanita
                        titulo="HorizontalBarChart"
                        contenido={<HorizontalBarChart />}
                    />                    
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="VerticalBarChart"
                        contenido={<VerticalBarChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="StackedBarChart"
                        contenido={<StackedBarChart />}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 mt-3">
                <div className="col-span-1">
                    <Ventanita
                        titulo="GroupedBarChart"
                        contenido={<GroupedBarChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="LineChart"
                        contenido={<LineChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="MultiaxisLineChart"
                        contenido={<MultiaxisLineChart />}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 mt-3">
                <div className="col-span-1">
                    <Ventanita
                        titulo="DoughnutChart"
                        contenido={<DoughnutChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="PolarAreaChart"
                        contenido={<PolarAreaChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="RadarChart"
                        contenido={<RadarChart />}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 mt-3">
                <div className="col-span-1">
                    <Ventanita
                        titulo="BubbleChart"
                        contenido={<BubbleChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="MultitypeChart"
                        contenido={<MultitypeChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="ScatterChart"
                        contenido={<ScatterChart />}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <div>
                    <Ventanita
                        titulo="Pie Chart"
                        contenido={<PieChart />}
                    />   
                </div>             
            </div>
            <div className="grid grid-cols-2 mt-3">
                <div className="col-span-1">
                    <Ventanita
                        titulo="ChartEvents"
                        contenido={<ChartEvents />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="GetChartRef"
                        contenido={<GetChartRef />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="GradientChart"
                        contenido={<GradientChart />}
                    />
                </div>
            </div>           
        </div>
    )
}

export default ConfigComponent;