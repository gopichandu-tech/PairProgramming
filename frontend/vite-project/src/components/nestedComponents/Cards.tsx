import { CodeXml, Users, Zap } from "lucide-react";

const Cards = () => {
    const properties = [
        {
            title:'Real-time Sync',
            description:'See changes instantly as your partner types',
            icon:<CodeXml  size={34}/>
        },
        {
            title:'Smart Suggestions',
            description:'Get AI-powered autocomplete as you code',
            icon:<Users  size={34}/>
        },
        {
            title:'Syntax Highlighting',
            description:'Beautiful code editor with multi-language support',
            icon:<Zap  size={34} />
        },
    ]
  return (
    <>

       <div className="flex flex-wrap gap-[24px] justify-center md:px-[0px] px-[24px]">
        {
            properties.map((item,index) => (
                <div key={index} className="bg-gradient-to-br from-black to-gray-700  p-[2rem] rounded-[1rem] md:w-[350px] w-full   min-h-[150px] max-h-[350px] text-[#fff] cursor-pointer">

                    <div>{item?.icon}</div>
                    <h2 className="text-[20px] font-[600]">{item?.title}</h2>
                    <p className="text-[16px] font-[400]">{item?.description}</p>

                </div>
            ))
        }
        </div> 
        
    </>
  )
}

export default Cards