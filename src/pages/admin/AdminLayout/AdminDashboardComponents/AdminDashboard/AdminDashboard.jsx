
import BarchartComponent from "../BarchartComponent/BarchartComponent";
import TicketCard from "../../../../../components/DashboardComponents/AdminDashboardComponents/TicketCard/TicketCard";
import ServiceRequestBarChart from "../ServiceRequestBarChart/ServiceRequestBarChart";
import TicketCountBarChart from "../TicketCountBarChart/TicketCountBarChart";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../../../config/axiosConfig";
import { TbUserQuestion } from "react-icons/tb";
import moment from "moment";

const AdminDashboard = () => {
  const { data } = useSWR("tickets", fetcher);
  const today = moment().format("YYYY-MM-DD");
  const previous30Days = moment().subtract(30, "days").format("YYYY-MM-DD");

  const { data: queryData,isLoading:queryLoading } = useSWR(
    `dashboard/query?start_date=${previous30Days}&end_date=${today}`,
    fetcher
  );
  const { data: solveTimeData,isLoading:solveLoading } = useSWR(
    `dashboard/solve?start_date=${previous30Days}&end_date=${today}`,
    fetcher
  );
  const { data: complaintData ,isLoading:complaintLoading} = useSWR(
    `dashboard/complaint?start_date=${previous30Days}&end_date=${today}`,
    fetcher
  );
  const { data: cftrData,isLoading:cftrLoading } = useSWR(
    `dashboard/cftr?start_date=${previous30Days}&end_date=${today}`,
    fetcher
  );

  return (
    <div className="font-poppins w-full">
      <div className="mb-4 flex gap-4 md:flex-row flex-col">
        <TicketCard
          count={data?.data}
          name="All Ticket"
          progress=""
          icon={<TbUserQuestion />}
        />
      </div>

      <div className="mt-2">
        <BarchartComponent />
      </div>

      <div className="mt-2">
        <ServiceRequestBarChart
          data={queryData?.data}
          title="30 days tickets for query"
          isLoading={queryLoading}
        />
      </div>
      <div className="mt-2 ">
        <TicketCountBarChart
          data={solveTimeData?.data}
          title="top 7 category tickets solved time"
          isLoading={solveLoading}
        />
      </div>
      <div className="mt-2">
        <ServiceRequestBarChart
          data={complaintData?.data}
          title="30 days tickets for complaint"
          isLoading={complaintLoading}
        />
      </div>
      <div className="mt-2">
        <ServiceRequestBarChart
          data={cftrData?.data}
          title="30 days tickets for C-FTR"
          isLoading={cftrLoading}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
