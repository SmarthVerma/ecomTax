import React from 'react';
import Logout from "../../components/user/Logout";
import ChangePassword from '@/components/user/ChangePassword';
import EditProfile from '@/components/user/EditProfile';
import Loader from '@/components/Loading/Loader';
import { useAuthContext } from '@/context/AuthContext';
import BackButton from '@/components/BackButton';
import formatDate from '@/util/formatDateString';

export default function UserProfile() {

  const { isLoading, data, isError, error } = useAuthContext()

  console.log({ isLoading, data, isError, error })
  console.log('in user', data?.avatar.url)
  if (isLoading) return <Loader />

  else return (
    <>
      <div className="min-h-screen w-full flex overflow-auto sm:overflow-hidden justify-center items-center">
        <div className="max-w-md min-w-[400px] relative bg-slate-800 rounded-xl shrink-0 p-7 border border-slate-500 border-opacity-55">
          <BackButton to={'/'} />
          <h1 className="text-center font-bold text-white text-4xl p-2 ">Account Details</h1>
          <hr />
          <div className="flex flex-col items-center p-4">
            <div className="avatar block text-center m-1">
              <div className="w-24 rounded-full">
                <img src={data?.avatar.url} alt="Profile" />
              </div>
            </div>
            <span className="text-gray-400 opacity-50 text-sm">{data?._id}</span>
            <div className="divider mt-0"></div>
            <div className="w-full text-center">
              <h2 className="font-bold text-orange-400 text-xl">Full name</h2>
              <span className="text-lg font-regular opacity-50 text-white">{data?.name}</span>
            </div>
            <div className="divider m-0"></div>
            <div className="w-full text-center">
              <h2 className="font-bold text-orange-400 text-xl">Email</h2>
              <span className="text-lg font-regular opacity-50 text-white">{data?.email}</span>
            </div>
            <div className="divider m-0"></div>
            <div className="w-full text-center">
              <h2 className="font-bold text-orange-400 text-xl">Joined on</h2>
              <span className="text-lg font-regular opacity-50 text-white">{formatDate(data?.createdAt) }</span>
            </div>
            <div className="divider"></div>
            <div className="flex space-x-4 mb-4">
              <EditProfile profileSrc={data?.avatar.url} />
              <ChangePassword />
            </div>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}


