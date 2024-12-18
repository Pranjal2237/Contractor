import { Navigation } from '@/components'
import Contact from '@/components/contact'
import Display from '@/components/display'
import React from 'react'

const page = () => {
  return (
    <div>
    <Navigation />
    <Display heading="Contact Us"/>
    <Contact />
    </div>
  )
}

export default page

export function generateMetadata({params}){
  return{
    title:"Contact Us"
  }
}