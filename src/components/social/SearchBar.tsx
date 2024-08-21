"use client";

import { searchMemberByKey } from "@/apis/repository/members.repository";
import { useToast } from "@/hooks/use-toast";
import { SearchDto } from "@/types/profile";
import debounce from "lodash.debounce";
import { Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export default function SearchBar() {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const [queryResults, setQueryResults] = useState<SearchDto[]>([]);

  const [isFetched, setIsFetched] = useState<boolean>(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  async function search() {
    if (input === "" || input === undefined) {
      // 입력 값이 빈 문자열이거나 공백이면 return
      setQueryResults([]);
      setIsFetched(true);
      return;
    }

    try {
      setIsFetched(false);
      const data = await searchMemberByKey(input);
      setQueryResults(data ?? []);
      setIsFetched(true);
    } catch (error: any) {
      return toast({
        title: "실패",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const request = debounce(async () => {
    await search();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, [input]);

  useEffect(() => {
    setInput("");
  }, [pathname]);

  useEffect(() => {
    console.log(queryResults);
  }, [queryResults]);

  return (
    <Command
      ref={commandRef}
      className="rounded-lg border w-full overflow-visible my-4"
    >
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search members..."
      />

      <CommandList>
        {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
        {queryResults.length > 0 && (
          <CommandGroup heading="members">
            {queryResults.map((member) => (
              <CommandItem
                onSelect={(e) => {
                  router.push(`/members/profile/${e}`);
                  router.refresh();
                }}
                key={member.memberId}
                value={member.username}
              >
                <Users className="mr-2 h-4 w-4" />
                <a href={`/members/profile/${member.memberId}`}>
                  {member.username}
                </a>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
