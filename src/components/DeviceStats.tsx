interface DeviceStats {
    mobile: number
    web: number
  }
  
  export default function DeviceStats() {
    const stats: DeviceStats = {
      mobile: 70,
      web: 30,
    }
  
    // Calculate the circumference and stroke dasharray
    const size = 200
    const strokeWidth = 30
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
  
    // Calculate stroke dasharray for each segment
    const mobileDash = (stats.mobile / 100) * circumference
    const webDash = (stats.web / 100) * circumference
  
    return (
      <div className="flex flex-col items-center max-w-xs mx-auto p-4">
        <h2 className="text-sm font-medium text-muted-foreground text-[#2F3F67] mb-4">USER DEVICE</h2>
  
        {/* Donut Chart */}
        <div className="relative w-[175px] h-[175px]">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {/* Web segment */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgb(186, 230, 253)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${webDash} ${circumference - webDash}`}
              strokeDashoffset={0}
            />
  
            {/* Mobile segment */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgb(20, 184, 166)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${mobileDash} ${circumference - mobileDash}`}
              strokeDashoffset={-webDash}
            />
          </svg>
        </div>
  
        {/* Legend */}
        <div className="flex gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span className="text-sm text-muted-foreground text-[#2F3F67]">Mobile</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-200" />
            <span className="text-sm text-muted-foreground text-[#2F3F67]">Web</span>
          </div>
        </div>
      </div>
    )
  }
  
  