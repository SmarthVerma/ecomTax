import { useCreateProduct } from '@/hooks/admin/useCreateProduct';
import React from 'react';
import { useForm } from 'react-hook-form';

function CreateProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: createProduct } = useCreateProduct();

  const handleCreateProduct = (data) => {
    const images = Array.from(data.images); // bs an images naam ka array ban gya
    const newData = { ...data, images };
    console.log(newData);
    createProduct(newData);
  };

  const handleFileChange = (event) => {
    console.log('handleFileChange called'); // Debugging log
    const files = event.target.files;
    console.log('Number of files selected:', files.length);
    // You can also log each file's name if needed
    for (let i = 0; i < files.length; i++) {
      console.log(`File ${i + 1}: ${files[i].name}`);
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <div className='bg-gray-800 flex flex-col gap-5 max-w-md w-96 rounded-lg p-5'>
        <h1 className='text-xl font-bold text-white'>Create the Product</h1>
        <form onSubmit={handleSubmit(handleCreateProduct)} className='flex flex-col gap-4'>
          <label className='input input-bordered bg-slate-600 text-white flex items-center gap-2'>
            Name:
            <input
              type="text"
              className="grow p-2"
              placeholder="Enter product name"
              {...register("name", { required: true })}
            />
          </label>

          <label className='input input-bordered bg-slate-600 text-white flex items-center gap-2'>
            Description:
            <input
              type="text"
              className="grow p-2"
              placeholder="Enter product description"
              {...register("description", { required: true })}
            />
          </label>

          <label className='input input-bordered bg-slate-600 text-white flex items-center gap-2'>
            Price:
            <input
              type="number"
              className="grow p-2"
              placeholder="Enter product price"
              {...register("price", { required: true, min: 0 })}
            />
          </label>
          <label className='input input-bordered bg-slate-600 text-white flex items-center gap-2'>
            Stock:
            <input
              type="number"
              className="grow p-2"
              placeholder="Enter Product Stock"
              {...register("stock", { required: true, min: 1 })}
            />
          </label>

          <label className='input input-bordered bg-slate-600 text-white flex items-center gap-2'>
            Category:
            <input
              type="text"
              className="grow p-2"
              placeholder="Enter product category"
              {...register("category", { required: true })}
            />
          </label>

          <label className='input input-bordered bg-slate-600 text-white flex items-center gap-2'>
            Images:
            <input
              type="file"
              className="grow p-2"
              onChange={handleFileChange}
              {...register("images", { required: true })}
              multiple
            />
          </label>
          <button type='submit' className='bg-blue-800 text-white p-3 rounded-xl'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;