import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/InputField/InputField';
import SubmitBtn from '../../../../components/SubmitBtn/SubmitBtn';
import toast from 'react-hot-toast';
import axiosClient from '../../../../config/axiosConfig';

const SolveModal = ({id}) => {
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axiosClient(false)
      .post(`tickets/solve/${id}`, data)
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
        <SubmitBtn name="Solve this ticket" isSubmitting={isSubmitting} />
      </form>
        </div>
    );
};

export default SolveModal;