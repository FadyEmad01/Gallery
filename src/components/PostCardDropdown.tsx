import React from 'react'
import { Ellipsis, Download } from 'lucide-react'
import { RiShareForwardLine } from "react-icons/ri";
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PostCardDropdownProps {
  title: string
  onShare: () => void
  onDownload: () => void
}

export function PostCardDropdown({ title, onShare, onDownload }: PostCardDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "ease-in-out duration-100",
            isDropdownOpen ? "right-2" : "-right-10 group-hover:right-2"
          )}
        >
          <button className="bg-white/90 rounded-full p-2">
            <Ellipsis />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="truncate">{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onShare}>
            Share
            <RiShareForwardLine className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDownload}>
            Download
            <Download className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

