import React from 'react'
import heroLogo from '../../assets/Nirmala Sitharaman.jpeg'

export default function AdminHome() {
  return (
    <>
      <div className="w-full min-h-screen  ">
        <div className="hero bg-base-200 min-h-screen px-0 sm:px-0 2xl:px-96 text-white">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={heroLogo}
              className="max-w-sm rounded-lg shadow-2xl cover"
            />
            <div className="text-center">
              <h1 className="text-5xl font-bold texce">Attention!</h1>
              <p className="py-6 max-w-2xl">
                Due to recent updates in tax regulations, there have been
                changes that may impact the pricing of our products. To ensure
                we maintain our profit margins and remain competitive, we will
                need to adjust our prices accordingly. We recommend reviewing
                these new tax schemes and making the necessary updates to our
                pricing strategy.
              </p>
              <button className="btn btn-primary">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
