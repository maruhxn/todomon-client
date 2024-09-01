import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShopItem } from "@/types/shop";
import { Star } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import PremiumItemPurchaseDialog from "./PremiumItemPurchaseDialog";
import StarPointItemPurchaseDialog from "./StarPointItemPurchaseDialog";

export default function ItemCard({ item }: { item: ShopItem }) {
  const isRealMoneyItem = item.moneyType === "REAL_MONEY";

  return (
    <Card
      key={item.id}
      className={`${
        item.isPremium && "border-primary border-2 bg-primary/5"
      } relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[250px]`}
    >
      {item.isPremium && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-bl">
          프리미엄
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <span>{item.name}</span>
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="absolute bottom-0 w-full space-y-4">
        <div className="flex items-center text-xl font-semibold">
          {isRealMoneyItem ? (
            <span className="text-primary">{item.price.toLocaleString()}₩</span>
          ) : (
            <>
              <Star className="h-6 w-6 text-yellow-400 mr-2" />
              <span>{item.price}</span>
            </>
          )}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full text-lg py-6">구매</Button>
          </DialogTrigger>
          {isRealMoneyItem ? (
            <PremiumItemPurchaseDialog item={item} />
          ) : (
            <StarPointItemPurchaseDialog item={item} />
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
}
