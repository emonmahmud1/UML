import { useForm } from "react-hook-form";
import InputField from "../../../components/InputField/InputField";
import SelectComponent from "../../../components/SelectComponent/SelectComponent";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axiosClient from "../../../config/axiosConfig";
import SubmitBtn from "../../../components/SubmitBtn/SubmitBtn";
import toast from "react-hot-toast";
import { format } from "date-fns";


const CustomerDetailsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [servicingDate, setServicingDate] = useState(new Date());
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  // const vehicleArr = ["car1", "car2", "car3", "car4"];

  const [products, setProducts] = useState([]);
  const [productModel, setProductModel] = useState([]);
  const [productVarient, setProductVarient] = useState([]);

  const [productId, setProductId] = useState();
  const [productModelId, setProductModelId] = useState();
  const [productVarientId, setProductVarientId] = useState(1);
  useEffect(() => {
    axiosClient(false)
      .get("/products")
      .then((res) => {
        // console.log(res.data.data)
        setProducts(res.data.data);
      })
      .catch(() => {});
  }, []);

  // get model using product id
  const handleProductId = (productId) => {
    // console.log(productId, "from customer details");
    axiosClient(false)
      .get(`/product_models?product_id=${productId.id}`)
      .then((res) => {
        setProductModel(res.data.data);
        // console.log(res.data.data[0].product_id, "product id");
        // console.log(res.data.data[0].id, "product model id");
        setProductId(res.data.data[0].product_id);
        setProductModelId(res.data.data[0].id);
      })
      .catch(() => {
        setProductModel([]);
      });
  };
  // get varient using product and model id
  const handleProductModelId = (productModelId) => {
    // console.log(productModelId, "product moded to find product variant");
    axiosClient(false)
      .get(
        // 'product_model_variants?product_id=1&product_model_id=1'
        `/product_model_variants?product_id=${productModelId.id}&product_model_id=${productModelId.product_id}`
      )
      .then((res) => {
        setProductVarient(res.data.data);
        // console.log(res.data.data, "get varient using product and model id");
      })
      .catch((err) => {
        // console.log(err);
        setProductVarient([]);
      });
  };

  // call details functions
  const [callType, setCallType] = useState([]);
  const [callCategory, setCallCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [callTypeId, setCallTypeId] = useState();
  const [callCategoryId, setCallCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  console.log(subCategory);

  // get call types
  useEffect(() => {
    axiosClient(false)
      .get("/call_types")
      .then((res) => {
        // console.log(res.data)
        setCallType(res.data.data);
      })
      .catch(() => {});
  }, []);

  // get call category using call type id
  const handleCallTypeId = (callTypeId) => {
    // console.log(callTypeId, "from ticketcreate");
    axiosClient(false)
      .get(`/call_categories?call_type_id=${callTypeId.id}`)
      .then((res) => {
        setCallCategory(res.data.data);
        // setCallTypeId(res.data.data.call_type_id);
        setCallTypeId(res.data.data[0].call_type_id);
        // console.log(res.data.data?.call_type_id);
      })
      .catch(() => {
        setCallCategory([]);
      });
  };

  // get call sub category using call category id
  const handleCallCategoryId = (callCategoryId) => {
    console.log(callCategoryId);
    axiosClient(false)
      .get(
        // call_sub_categories?call_type_id=1&call_category_id=1
        `call_sub_categories?call_type_id=${callCategoryId.call_type_id}&call_category_id=${callCategoryId.id}`
      )
      .then((res) => {
        // consol.log(res.data.data)
        setSubCategory(res.data.data);
        setCallCategoryId(res.data.data[0].call_category_id);
      })
      .catch(() => {
        setSubCategory([]);
      });
  };
  const handleCallSubCategoryId = (callSubCategoryId) => {
    setSubCategoryId(callSubCategoryId.id);
  };
  // end call details functions

  const onSubmit = (data) => {
    const formattedServicingDate = format(servicingDate, "yyyy-MM-dd");
    const formattedPurchaseDate = format(purchaseDate, "yyyy-MM-dd");
    console.log(
      {
        ...data,
        call_type_id: callTypeId,
        call_category_id: callCategoryId,
        call_sub_category_id: subCategoryId,
        product_id: productId,
        product_model_id: productModelId,
        product_model_variant_id: productVarientId,
        last_servicing_date: formattedServicingDate,
        date_of_purchase: formattedPurchaseDate,
      })
   const newData =   {
        ...data,
        call_type_id: callTypeId,
        call_category_id: callCategoryId,
        call_sub_category_id: subCategoryId,
        product_id: productId,
        product_model_id: productModelId,
        product_model_variant_id: productVarientId,
        last_servicing_date: formattedServicingDate,
        date_of_purchase: formattedPurchaseDate,
      }
      axiosClient(false)
      .post("/tickets", newData)
      .then((res) => {
        console.log(res,'ticket creat responses');
        toast.success(`${res.data.message}`);
      })
      .catch((err) => {
        console.log(err,'ticket create errors');
        toast.error("An error occurred. Please try again.");
      });
    
   
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <div className="bg-[#c8ecec] dark:bg-[#0F3333] font-poppins rounded-lg p-2">
          <h1 className="text-center mb-4 text-[#1F8685] font-medium text-base">
            Personal Details
          </h1>
          {/* personal details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Name"
                placeholder=""
                name="customer_name"
                register={register("customer_name")}
                error={errors.name}
                bgcolor="#fff"
                textColor="black"
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Phone"
                placeholder=""
                name="phone"
                register={register("customer_phone")}
                error={errors.phone}
                bgcolor="#fff"
                textColor="black"
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Alternate Number"
                placeholder=""
                name="altPhone"
                register={register("alternate_number")}
                error={errors.altPhone}
                bgcolor="#fff"
                textColor="black"
              />
            </div>
            <div className="col-span-12 md:col-span-5">
              <InputField
                label="Registered Phone Number"
                placeholder=""
                name="registeredPhone"
                register={register("registered_phone_number")}
                error={errors.registeredPhone}
                bgcolor="#fff"
                textColor="black"
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-7">
              <InputField
                label="Address"
                placeholder=""
                name="address"
                register={register("address")}
                error={errors.address}
                bgcolor="#fff"
                textColor="#979797"
                required={true}
              />
            </div>
          </div>
        </div>
        {/* end personal details */}

        {/* call details */}
        <div className="mt-5 bg-[#addcdc] dark:bg-[#0F3333] font-poppins rounded-lg p-2">
          <h1 className="text-center mb-4 text-[#1F8685] font-medium text-base">
            Call Details
          </h1>

          <div className="grid gap-5 grid-cols-12">
            <div className="col-span-6">
              <SelectComponent
                placeholder="Call Type"
                register={register}
                name="call_type_id"
                selectArr={callType}
                handleCallTypeId={handleCallTypeId}
                error={errors.name}
              />
            </div>
            <div className="col-span-6">
              <SelectComponent
                placeholder="Call Category"
                register={register}
                name="call_category_id"
                selectArr={callCategory}
                handleCallCategoryId={handleCallCategoryId}
                error={errors.name}
              />
            </div>
            <div className="col-span-6">
              <SelectComponent
                placeholder="Call Sub-Category"
                register={register}
                name="call_sub_category_id"
                selectArr={subCategory}
                handleCallSubCategoryId={handleCallSubCategoryId}
                error={errors.name}
              />
            </div>
          </div>
        </div>
        {/* end call details */}

        {/* product details */}
        <div className="bg-[#aae0e0] dark:bg-[#1B5757] font-poppins rounded-lg mt-3 p-2">
          <h1 className="text-center mb-4 text-[#1F8685] font-medium text-base">
            Product Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <SelectComponent
                placeholder="Vehicle Product id"
                register={register}
                name="product_id"
                selectArr={products}
                handleProductId={handleProductId}
                error={errors.name}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <SelectComponent
                placeholder="Vehicle Product Model id"
                register={register}
                name="product_model_id"
                selectArr={productModel}
                handleProductModelId={handleProductModelId}
                error={errors.name}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <SelectComponent
                placeholder="Product Model Varient id"
                register={register}
                name="product_model_variant_id"
                selectArr={productVarient}
                error={errors.name}
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <InputField
                label=" Vehicle Registration Number"
                placeholder=""
                name="vehicle_registration_number"
                register={register('vehicle_registration_number')}
                error={errors.name}
                bgcolor="#fff"
                textColor="black"
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <InputField
                label=" Engine Number"
                placeholder=""
                name="engine_number"
                register={register('engine_number')}
                error={errors.engine_number}
                bgcolor="#fff"
                textColor="black"
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Odometer Reading (Kms)"
                placeholder=""
                name="odometer_reading"
                register={register('odometer_reading')}
                error={errors.odometer_reading}
                bgcolor="#fff"
                textColor="black"
              />
            </div>
            <div className="col-span-12 md:col-span-4 ">
              <label className="">
                Date of Purchase
                <DatePicker
                  className="dark:bg-[#2d7a7a] w-full mt-1 pt-2"
                  showIcon
                  toggleCalendarOnIconClick
                  selected={purchaseDate}
                  onChange={(date) => setPurchaseDate(date)}                 
                  icon="fa fa-calendar"
                />
              </label>
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Chassis Number"
                placeholder=""
                name="chasis_number"
                register={register('chasis_number')}
                error={errors.chassis_number}
                bgcolor="#fff"
                textColor="black"
              />
            </div>

            {/* row 3 */}
            <div className="col-span-12 md:col-span-4 ">
              <label className="">
                Last Servicing Date
                <DatePicker
                  className="w-full dark:bg-[#2d7a7a] mt-1 pt-2"
                  showIcon
                  toggleCalendarOnIconClick
                  selected={servicingDate}
                  onChange={(date) => setServicingDate(date)}
                />
              </label>
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Servicing Count"
                placeholder=""
                name="servicing_count"
                register={register('servicing_count')}
                error={errors.servicing_count}
                bgcolor="#fff"
                textColor="black"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Warranty Status"
                placeholder=""
                name="warranty_status"
                register={register('warranty_status')}
                error={errors.warranty_status}
                bgcolor="#fff"
                textColor="#979797"
                required={true}
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputField
                label="Source"
                placeholder=""
                name="source"
                register={register('source')}
                error={errors.warranty_status}
                bgcolor="#fff"
                textColor="#979797"
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 mt-4">
          <label className="text-sm md:text-base">
            Remark<sup className="text-red-600 text-base">*</sup>
          </label>
          <textarea
            className="textarea w-full resize-none dark:bg-[#1B5757] border-2  border-[#166835]"
            placeholder=""
            {...register("remarks")}
          ></textarea>
        </div>
        {/* end product details */}
        <SubmitBtn name="Submit Form" />
      </form>
    </>
  );
};

export default CustomerDetailsForm;
