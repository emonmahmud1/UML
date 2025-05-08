import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectComponent from "../../../../components/SelectComponent/SelectComponent";
import useSWR from "swr";
import axiosClient, { fetcher } from "../../../../config/axiosConfig";
import InputField from "../../../../components/InputField/InputField";
import SubmitBtn from "./../../../../components/SubmitBtn/SubmitBtn";
import toast from "react-hot-toast";

const ForwardTicketModal = ({ id }) => {
  const [deptId, setDeptId] = useState();
  const { data: deparmentData, error } = useSWR("departments", fetcher);
  const departments = deparmentData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleDepartmentId = (e) => {
    setDeptId(e.id);
  };

  const onSubmit = (data) => {
    const newData = { ...data, forwarded_to_department_id: deptId };
    console.log(newData);

    axiosClient(false)
      .post(`tickets/forward/${id}`, newData)
      .then((res) => {
        console.log(res?.data);
        toast.success(`${res.data.message}`);
        return;
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <SelectComponent
              placeholder="Select Department"
              register={register}
              name="department_id"
              selectArr={departments}
              handleDepartmentId={handleDepartmentId}
              error={errors.department_id}
              required={true}
            />
          </div>
          <div>
            <InputField
              label="Remarks"
              placeholder="Remarks"
              type="text"
              name="remarks"
              bgcolor="#C1E3D6"
              register={register("remarks")}
              error={errors.remarks}
              required={true}
            />
          </div>
          <SubmitBtn name="Forward" isSubmitting={isSubmitting} />
        </form>
      </div>
    </>
  );
};

export default ForwardTicketModal;
