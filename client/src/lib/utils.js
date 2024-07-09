import { toast } from "@/components/ui/use-toast";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const inputChecks = (whichToBeChecked, wager, bet, userChoiced) => {
  switch (whichToBeChecked) {
    default:
      if (!wager) {
        toast({
          title: "Please, add valid wager",
        });
        return false;
      }
      if (!bet || Number(bet) <= 0) {
        toast({
          title: "Please, place valid bet!",
        });
        return false;
      }
      if (!userChoiced) {
        toast({
          title: "Please, Choose heads or tails!",
        });
        return false;
      }
      return true;
  }
};
