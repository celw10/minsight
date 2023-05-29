// Local import
import { LineChart } from "../assets/d3/Plot";

let data = [
    { date: 20220101, impressions: 100 },
    { date: 20220102, impressions: 120 },
    // ... truncated but you get it
  ];

// data room parent page
export const Analysis = () => {

    // return the 2D data room components
    return (
            <div className="flex h-screen flex-row">
                <LineChart Data={data} />
            </div>
    );
}