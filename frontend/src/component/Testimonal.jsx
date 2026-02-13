import React from 'react'

function Testimonal() {
  return (
    <div className='text-center px-2.5 mt-30'>
        <h2 className='font-semibold  text-gray-800 text-3xl sm:text-4xl md:text-5xl'>Loved by Creators</h2>
        <p className='text-gray-500 mb-10 mt-2'>Don't just take our word for it. Here's what our users are saying.</p>

        <div className="text-left grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center max-w-fit mx-auto">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="max-w-80 w-full rounded-lg shadow-lg  p-6 mx-auto"> 
                      <div >
                        {[...Array(5)].map((_,i)=>
                        <span key={i} className={`${testimonial.rate >i ? "text-indigo-600 " : "text-indigo-200"} text-2xl`} >★</span>
                        )}
                            
                            
                       
                    </div>
                   
                    <p className='text-gray-400 my-3 border-b pb-4 border-gray-400'>"{testimonial.feedback}"</p>
                  

                    <div className='flex items-center gap-2.5'>
                        <img src={testimonial.avatar} alt={`${testimonial.name}'s avatar`} className="rounded-full h-12 w-12 object-cover" />
                        <div>
                    <h3 className='text-gray-500'>{testimonial.name}</h3>
                    <p className='text-gray-400 text-[12px]'>{testimonial.profestion}</p>

                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default Testimonal


const testimonials = [
    {
      name: "John Doe",
      profestion: "Content Creator",
      feedback: "This AI tool has revolutionized my workflow! It's incredibly intuitive and has saved me so much time.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rate: 5
    },
    {
      name: "Jane Smith",
        profestion: "Marketer",
      feedback: "I was skeptical at first, but after using this tool, I'm amazed at how much it has improved my productivity. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        rate: 4
    },
    {
        name: "Emily Johnson",
        profestion: "Blogger",
        feedback: "As a content creator, this AI tool has been a game-changer. It helps me generate ideas and create content faster than ever before.",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rate: 5
    }
    ];