export default function TagList() {
  return (
  <>
      <div className="relative w-full max-w-md mx-auto py-5">

        <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-b from-black/20 to-transparent"></div>

        <div className="overflow-y-auto max-h-50 flex flex-col -my-5 space-y-2 px-4 scrollbar-hide">
          <div className="flex flex-row text-xl"><p className="mr-3 text-green">#</p><p>All</p></div>
          <div className="flex flex-row text-xl"><p className="mr-3 text-cyan">#</p><p>Personal</p></div>
          <div className="flex flex-row text-xl"><p className="mr-3 text-red">#</p><p>Work</p></div>
          <div className="flex flex-row text-xl"><p className="mr-3 text-purple">#</p><p>Shopping</p></div>
          <div className="flex flex-row text-xl"><p className="mr-3 text-yellow">#</p><p>Hobbies</p></div>
          <div className="flex flex-row text-xl"><p className="mr-3 text-gray">#</p><p>Finances</p></div>
        </div>
      
        <div className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-t from-black/20 to-transparent"></div>
      
      </div>
  </>  
  )
}
