import React from "react";
import InputField from "../../../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import SubmitBtn from "../../../../components/SubmitBtn/SubmitBtn";
import axiosClient from "../../../../config/axiosConfig";
import toast from "react-hot-toast";

const RemarksTicketModal = ({ id, ticketRemarks }) => {
//   const { remarks } = ticketRemarks;

  const {
    register,
    handleSubmit,
    reset,
    setError,

    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axiosClient(false)
      .post(`tickets/remarks/comments/${id}`, data)
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <SubmitBtn name="Remarks This Ticket" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default RemarksTicketModal;
