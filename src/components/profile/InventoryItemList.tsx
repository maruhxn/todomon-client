import { InventoryItemDto } from "@/types/item";

export default function InventoryItemList({
  data,
}: {
  data: InventoryItemDto[];
}) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        {data.length > 0 &&
          data.map((inventoryItem) => (
            <div
              key={inventoryItem.id}
              className="flex items-center justify-between bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-lg"
            >
              <h4 className="font-medium">{inventoryItem.name}</h4>
              <h4 className="font-medium">{inventoryItem.quantity}개</h4>
            </div>
          ))}
        {data.length <= 0 && (
          <span className="text-sm text-center">
            인벤토리에 아이템이 없습니다.
          </span>
        )}
      </div>
    </div>
  );
}
