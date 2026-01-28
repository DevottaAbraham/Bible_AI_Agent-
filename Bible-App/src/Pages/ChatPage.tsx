import { useState } from 'react';
import {Sidebar} from '../Components/Siderbar';

export const ChatPage=()=>{
  const [open, setOpen] = useState(false);

  return (
  
  <div className="flex flex-col flex-1 justify-center ">
     <Sidebar open={open} setOpen={setOpen} />
      
      </div>

  )

}