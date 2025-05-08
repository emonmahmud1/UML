
const PersonalDetails = ({singleData}) => {
    return (
        <>
        <h2 className="text-base text-[#1F8685] font-medium ">
            Personal Details
          </h2>
          <div className="border dark:bg-[#1F8685] border-[#1F8685] p-2 rounded-lg bg-[#FFFFFF]">
            <table className=" border-separate border-spacing-1 text-sm dark:text-[#CDE7E7] text-[#4B4B4B]  text-left w-full table">
              <tbody className="">
                <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                  <th className="w-[30%]">Customer Profile Id</th>
                  <td>{singleData?.customer_profile_id}</td>
                </tr>
                <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                  <th>Tracking Id</th>
                  <td>{singleData?.tracking_id}</td>
                </tr>
                <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                  <th>Phone Number</th>
                  <td>{singleData?.customer_phone}</td>
                </tr>
                <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                  <th>Status</th>
                  <td>{singleData?.status}</td>
                </tr>
               
              </tbody>
            </table>
          </div>
            
        </>
    );
};

export default PersonalDetails;