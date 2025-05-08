import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import ProductDetails from "./ProductDetails/ProductDetails";
import Heading from "../../../components/Heading/Heading";
import useSWR from "swr";
import { fetcher } from "../../../config/axiosConfig";
import ForwardTicketModal from "./ForwardTicketModal/ForwardTicketModal";
import RemarksTicketModal from "./RemarksTicketModal/RemarksTicketModal";
import SolveModal from "./SolveModal/SolveModal";

const TicketDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("dispatched");
  const tabOnClick = (e) => {
    setTab(e);
    console.log(e);
  };

  const {
    data: singleData,
    error,
    isLoading,
  } = useSWR(`tickets/${id}`, fetcher);

  const editelement = {
    tabName: "Edit/Update",
    onClick: tabOnClick,
    tabValue: "editUpdate",
  };
  const dispatched = {
    tabName: "Dispatched",
    onClick: tabOnClick,
    tabValue: "dispatched",
  };
  // console.log(tab);
  // handle modals
  const handleForwardModal = () => {
    document.getElementById("forwardModal").showModal();
  };
  const handleRemarksdModal = () => {
    document.getElementById("remarksModal").showModal();
  };
  const handleSolveModal= ()=>{
    document.getElementById("solvemodal").showModal();

  }

  return (
    <>
      <div className="grid grid-cols-12 gap-3 font-poppins min-h-[calc(100vh-150px)] px-4">
        <div className="hidden md:block col-span-2 border dark:bg-[#1F8685] bg-[#FAFAFA] border-[#1F8685] text-center p-2 rounded-2xl">
          <div>
            <h1 className="text-base lg:text-xl dark:bg-[#0F3333] bg-[#1F8685] text-white rounded-lg">
              Ticket Timeline
            </h1>
          </div>
        </div>
        <div className="md:col-span-10 col-span-12">
          <div className="dark:bg-[#0F3333] dark:text-[#CDE7E7] bg-white rounded-lg ">
            <Heading headingName="Ticket Details" />
          </div>

          <div className="mt-3 flex gap-4 flex-wrap justify-between">
            <div className="border lg:w-[250px] w-full flex items-center border-[#1F8685] text-center gap-3 md:gap-6 rounded-lg text-[#1F8685] ">
              <h1 className="pl-3 flex-grow lg:pl-5 dark:text-[#CDE7E7]">
                {singleData?.data.id}
              </h1>{" "}
              <p className=" bg-[#FF0099] text-base border rounded-lg  h-full px-3 lg:px-6 font-medium text-white lg:pt-1">
                Valid
              </p>
            </div>
            {/* <TabButton
            tabValue={dispatched.tabValue}
            tabName={dispatched.tabName}
            onClick={dispatched.onClick}
            isActiveTab={tab}
          /> */}
            {/* <div className="border py-2">
                <button onClick={()=>{setEditBtn(!editBtn)}} className={editBtn?"text-white bg-[#FF0099] btn border-2":"text-[#1F8685] btn border-2 border-[#cebfbf]"}>Edit/Update</button>
          </div> */}
            {/* {
            <TabButton
              //  icon={item.icon}
              tabValue={editelement.tabValue}
              tabName={editelement.tabName}
              onClick={editelement.onClick}
              isActiveTab={tab}
            />
          } */}
          </div>

          <div>
            {/* personal details */}
            <div className="mt-3">
              <PersonalDetails singleData={singleData?.data} />
            </div>
            <div className="mt-5">
              <ProductDetails singleData={singleData?.data} />
            </div>
            {/* comments */}
            {/* <div className="my-5 border min-h-14 border-[#979797] rounded-lg dark:bg-[#0F3333] bg-[#FAFAFA] overflow-y-auto px-5 py-2">
              <h2 className="font-medium text-base dark:text-[#CDE7E7] text-[#464E5F]">
                Comments
              </h2>
            </div> */}
          </div>
          <div className="flex gap-5 max-w-[300px]">
            <button
              onClick={handleForwardModal}
              className="btn mt-5 w-full text-white border-none bg-primary-light"
            >
              {" "}
              Forward Ticket
            </button>
            <button onClick={handleSolveModal}  className="btn mt-5 w-full text-white border-none bg-primary-light">
              {" "}
              Solve Ticket
            </button>
            <button onClick={handleRemarksdModal} className="btn mt-5 w-full text-white border-none bg-primary-light">
              {" "}
              Remark Ticket
            </button>
          </div>

          {/* {tab === "editUpdate" && <EditAndUpdate data={singleData?.data} />} */}
        </div>
      </div>
      <div>
        <dialog id="forwardModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <ForwardTicketModal id={id}/>
          </div>
        </dialog>
      </div>
      <div>
        <dialog id="remarksModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <RemarksTicketModal id={id} ticketRemarks ={singleData?.data}/>
          </div>
        </dialog>
      </div>
      <div>
        <dialog id="solvemodal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <SolveModal id={id}/>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default TicketDetails;
