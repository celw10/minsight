// Local import
import { PlotD3 } from "../assets/d3/Plot";

// data room parent page
export const Analysis = () => {

    // return the 2D data room components /
    return (
        <div className="h-max w-max">
            <PlotD3 top={10} right={50} bottom={50} left={50} width={800} height={400} fill="black" />
        </div>
    );
}