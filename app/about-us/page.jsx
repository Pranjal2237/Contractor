import { Navigation } from '@/components'
import About from '@/components/about'
import Display from '@/components/display'
import React from 'react'



const page = () => {
  return (
    <div>
    <Navigation />
    <Display heading="About Us" />
      <About range="configs!B:B" link="about" subheading="Who We Are" />
      <About range="configs!C:C" link="why" subheading="Why Choose Us" />
    </div>
  )
}

export default page


export function generateMetadata({params}){
  return{
    title:"About Us"
  }
}