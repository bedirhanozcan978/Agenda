export default function Header(){
  return (
    <header className="flex items-center justify-between p-4 border-b border-ocean bg-sand font-lalezar text-2xl">
      <div className="text-ocean">Today</div>
      <div className="text-ocean"> 10/21/2025 - 11.02 </div>
      <nav className="space-x-4">
        <button className="text-ocean font-medium border-b-3 border-ocean">Tasks</button>
        <button className="text-ocean">Calendar</button>
      </nav>
    </header>
  );
}
