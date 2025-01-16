import { getAllShopItemsRequest } from "@/apis/repository/item.repository";
import ItemCard from "@/components/shop/ItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleErrorForServerComponent } from "@/lib/error-handler";

export default async function ShopPage() {
  const shopItems = await getAllShopItemsRequest();
  if ("error" in shopItems) {
    return handleErrorForServerComponent(shopItems);
  }

  const starPointItems = shopItems
    ? shopItems.filter((item) => item.moneyType === "STARPOINT")
    : [];
  const premiumItems = shopItems
    ? shopItems?.filter((item) => item.moneyType === "REAL_MONEY")
    : [];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          상점
        </h1>
        <Tabs defaultValue="starpoint" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="starpoint">⭐️ 상점</TabsTrigger>
            <TabsTrigger value="premium">프리미엄 상점</TabsTrigger>
          </TabsList>
          <TabsContent value="starpoint">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {starPointItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="premium">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {premiumItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
