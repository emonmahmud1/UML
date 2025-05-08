import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient, { fetcher } from "../../../config/axiosConfig";
import Table from "../../../components/Table.jsx/Table";
import moment from "moment";
import getDataFromApi from "../../../utilities/getDataFromApi";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { toast } from "react-toastify";
import useSWR from "swr";

const PreviousTicketInfo = () => {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsloading] = useState(true);

  // useEffect(() => {
  //   axiosClient(false)
  //     .get("/call_categories")
  //     .then((response) => {
  //       setData(response.data.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("/tickets")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //       setIsloading(false);
  //     });
  // }, []);
  const { data, error, isLoading } = useSWR("tickets", fetcher);
  // console.log(data.data);

  const columns = [
    {
      header: "Ticket id",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "customer_name",
    },
    {
      header: "Tracking Id",
      accessorKey: "tracking_id",
    },
    {
      header: "Created Time",
      accessorKey: "create_time",
      cell: ({ value }) => moment(value).format("DD MMM YY"),
    },
  ];

 
  if (isLoading) {
    return <Skeleton />;
  }
  //  else if () {
  //   return toast.error("Data not Loading");
  // }

  return (
    <Table
      columns={columns}
      data={data?.data}
      ticketTable={true}
      // handleDelete={handleDelete}
      //   tableName="Call Category"
    />
  );
};

export default PreviousTicketInfo;
