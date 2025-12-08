import React from 'react'
import { CodeXml, Users, Zap } from "lucide-react";

const PairCode = () => {
  return (
    <>
      <div className='text-center'>
          <div className='inline-flex p-6 bg-gradient-to-br from-black to-gray-700 rounded-xl mb-6'><CodeXml color="#fff" size={34}/></div>
          <h1 className='text-[28px] font-[600]'>PairCode</h1>
          <p className='text-[18px] font-[400]'>Real-time collaborative coding with AI-powered suggestions</p>
      </div>
    </>
  )
}

export default PairCode