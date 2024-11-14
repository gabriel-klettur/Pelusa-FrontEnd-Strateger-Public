import Ventanita from "../../../common/Ventanita";
import HorizontalBarChart from "../../Components/charts/HorizontalBarChart";
import VerticalBarChart from "../../Components/charts/VerticalBarChart";
import StackedBarChart from "../../Components/charts/StackedBarChart";
import GroupedBarChart from "../../Components/charts/GroupedBarChart";
import LineChart from "../../Components/charts/LineChart";
import MultiaxisLineChart from "../../Components/charts/MultiaxisLineChart";
import DoughnutChart from "../../Components/charts/DoughnutChart";
import PolarAreaChart from "../../Components/charts/PolarAreaChart";
import RadarChart from "../../Components/charts/RadarChart";
import BubbleChart from "../../Components/charts/BubbleChart";
import MultitypeChart from "../../Components/charts/MultitypeChart";
import ScatterChart from "../../Components/charts/ScatterChart";
import ChartEvents from "../../Components/charts/ChartEvents";
import GetChartRef from "../../Components/charts/GetChartRef";
import GradientChart from "../../Components/charts/GradientChart";
import PieChart from "../../Components/charts/PieChart";

const ChartsExamplesContiner = () => {
    return(
        <>
            <div className="grid grid-cols-3 mt-3">
                <div className="col-span-1">
                    <Ventanita
                        titulo="HorizontalBarChart"
                        contenido={<HorizontalBarChart />}
                    />                    
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="StackedBarChart"
                        contenido={<StackedBarChart />}
                    />
                </div>
                <div className="col-span-1">
                    <Ventanita
                        titulo="VerticalBarChart"
                        contenido={<VerticalBarChart />}
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
                        titulo="Pie Chart"
                        contenido={<PieChart />}
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
                        titulo="Radar Chart"
                        contenido={<RadarChart />}
                    />   
                </div>             
            </div>
            <div className="grid grid-cols-3 mt-3">
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
        </>
    );

}

export default ChartsExamplesContiner;