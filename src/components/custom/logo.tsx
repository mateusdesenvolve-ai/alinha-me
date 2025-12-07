import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  href?: string
  className?: string
}

export function Logo({ size = "md", showText = true, href = "/", className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" }
  }

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image 
        src="/icon.svg" 
        alt="Alinha.me" 
        width={sizes[size].icon} 
        height={sizes[size].icon}
        className="hover:scale-105 transition-transform"
      />
      {showText && (
        <span className={`${sizes[size].text} font-bold text-gray-900 tracking-tight`}>
          Alinha<span className="text-[#1F75FE]">.me</span>
        </span>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
