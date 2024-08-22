import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SleepEntry, ApiResponse } from '../types';

const SleepForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SleepEntry>();
  const queryClient = useQueryClient();

  const mutation = useMutation<ApiResponse<SleepEntry>, Error, SleepEntry>({
    mutationFn: (data: SleepEntry) => axios.post('/api/sleep-entries', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      reset(); 
    },
    onError: (error: Error) => {
      console.error('Error submitting data:', error);
    },
  });

  const onSubmit: SubmitHandler<SleepEntry> = (data) => {
    const formattedData: SleepEntry = {
      ...data,
      sleepDuration: Number(data.sleepDuration),
      date: new Date(data.date).toISOString().split('T')[0]
    };
    console.log(formattedData);
    mutation.mutate(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Sleep Entry</h2>
      <div className="mb-4">
        <label className="block text-gray-700">User Name</label>
        <input
          {...register('userName', { required: true })}
          placeholder="Username"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.userName && <span className="text-red-500">UserName is required</span>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <input
          {...register('gender', { required: true })}
          placeholder="Gender"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.gender && <span className="text-red-500">Gender is required</span>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Sleep Duration (hours)</label>
        <input
          type="number"
          {...register('sleepDuration', { required: true, min: 0, max: 24 })}
          placeholder="Sleep Duration"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.sleepDuration && <span className="text-red-500">Valid sleep duration is required</span>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          {...register('date', { required: true })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.date && <span className="text-red-500">Date is required</span>}
      </div>
      
      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {mutation.isLoading ? 'Submitting...' : 'Submit'}
      </button>

      {mutation.isError && <span className="text-red-500 mt-2 block">Error submitting data. Please try again.</span>}
      {mutation.isSuccess && <span className="text-green-500 mt-2 block">Data submitted successfully!</span>}
    </form>
  );
};

export default SleepForm;