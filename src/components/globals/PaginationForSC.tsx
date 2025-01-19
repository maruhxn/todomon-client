"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PageItem } from "@/types/globals";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "../ui/button";

interface PaginationsProps {
  pagingData: PageItem<any>;
}

// 1 2 --- >      0
// < 1 2 3 --- >      1
// < --- 2 3 4 --- >     2
// < --- 3 4 5 >        3
// < --- 4 5            4

export function PaginationForSC({ pagingData }: PaginationsProps) {
  const { isFirst, isLast, totalPage, totalElements, pageNumber } = pagingData;
  const router = useRouter();

  return (
    <Pagination>
      <PaginationContent>
        {!isFirst && (
          <PaginationItem
            onClick={() => router.push(`?page=${pageNumber - 1}`)}
          >
            <div
              className={cn(
                "gap-1 pl-2.5",
                buttonVariants({
                  variant: "ghost",
                  size: "default",
                })
              )}
            >
              <ChevronLeft className="size-4" />
              <span>이전</span>
            </div>
          </PaginationItem>
        )}
        {pageNumber > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!isFirst && (
          <PaginationItem
            onClick={() => router.push(`?page=${pageNumber - 1}`)}
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })
              )}
            >
              {pageNumber}
            </div>
          </PaginationItem>
        )}
        <PaginationItem>
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              }),
              "cursor-default"
            )}
          >
            {pageNumber + 1}
          </div>
        </PaginationItem>
        {totalPage - pageNumber > 1 && (
          <PaginationItem
            onClick={() => router.push(`?page=${pageNumber + 1}`)}
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })
              )}
            >
              {pageNumber + 2}
            </div>
          </PaginationItem>
        )}
        {totalPage - pageNumber > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!isLast && (
          <PaginationItem
            onClick={() => router.push(`?page=${pageNumber + 1}`)}
          >
            <div
              className={cn(
                "gap-1 pr-2.5",
                buttonVariants({
                  variant: "ghost",
                  size: "default",
                })
              )}
            >
              <span>다음</span>
              <ChevronRight className="size-4" />
            </div>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
