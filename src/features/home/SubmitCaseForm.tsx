import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHttpClient } from '../../contexts/HttpClientContext';
import { makeCaseService, type CaseInput } from '../../api/cases';
import { SPECIALTIES } from '../../utils/specialties';

export default function SubmitCaseForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CaseInput>();
  const client = useHttpClient();
  const { submitCase } = makeCaseService(client);

  const onSubmit = async (data: CaseInput) => {
    console.log('Submitting case payload:', JSON.stringify(data, null, 2));

    try {
      await submitCase(data);
      toast.success('Case submitted!');
      reset();
    } catch {
      toast.error('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: '0 auto' }}>
      <input
        {...register('email', { required: true })}
        type="email" placeholder="Email" style={{ width: '100%', marginBottom: 8 }}
      />
      {errors.email && <p>Email is required</p>}

      <select {...register('speciality', { required: true })} style={{ width: '100%', marginBottom: 8 }}>
        <option value="">Select specialty</option>
        {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
      </select>
      {errors.speciality && <p>Specialty is required</p>}

      <textarea
        {...register('description', { required: true })}
        placeholder="Describe your case"
        style={{ width: '100%', height: 100, marginBottom: 8 }}
      />
      {errors.description && <p>Description is required</p>}

      <button type="submit" disabled={isSubmitting} style={{ padding: '0.5rem 1rem' }}>
        {isSubmitting ? 'Submitting…' : 'Submit Case'}
      </button>
    </form>
  );
}
