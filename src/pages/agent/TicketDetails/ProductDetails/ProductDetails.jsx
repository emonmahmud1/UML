
const ProductDetails = ({ singleData }) => {
  return (
    <>
      <h2 className="text-base text-[#1F8685] font-medium ">Product Details</h2>
      <div className="flex justify-between flex-col md:flex-row  gap-4">
        <div className="border dark:bg-[#1F8685] border-[#1F8685] md:w-[50%] w-full  p-2 rounded-lg bg-[#FFFFFF]">
          <table className=" dark:text-[#CDE7E7] border-separate text-sm text-[#4B4B4B]  text-left w-full table">
            <tbody>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th className="">Vehicle Product Name</th>
                <td>{singleData?.product_name}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Vehicle Product Model Name</th>
                <td>{singleData?.product_model_name}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Vehicle Product Model variant Name</th>
                <td>{singleData?.product_model_variant_name}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Vehicle Registration Number</th>
                <td>{singleData?.vehicle_registration_number}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Engine Number</th>
                <td>{singleData?.engine_number}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Odometer Reading (Kms)</th>
                <td>{singleData?.odometer_reading}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 2nd table */}
        <div className="border dark:bg-[#1F8685] border-[#1F8685] md:w-[50%] w-full p-2 rounded-lg bg-[#FFFFFF]">
          <table className="border-separate dark:text-[#CDE7E7]  text-sm text-[#4B4B4B]  text-left w-full table">
            <tbody>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th className="">Chasis Number</th>
                <td>{singleData?.chasis_number}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Last Servicing Date </th>
                <td>{singleData?.last_servicing_date}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Date of Purchase</th>
                <td>{singleData?.date_of_purchase}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Servicing Count </th>
                <td>{singleData?.servicing_count}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Warranty Status</th>
                <td>{singleData?.warranty_status}</td>
              </tr>
              <tr className="bg-[#F0F0F0] dark:bg-[#0F3333]">
                <th>Remarks</th>
                <td>{singleData?.remarks}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
