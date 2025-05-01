import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function SvgSkeleton({
  className,
  width = "100%",
  height = "100%",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  width?: string | number;
  height?: string | number;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
      <div className="absolute inset-0 bg-muted animate-pulse" />
    </div>
  )
}

export { Skeleton, SvgSkeleton }
