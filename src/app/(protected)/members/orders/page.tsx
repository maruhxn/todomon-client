import { getMyOrdersRequest } from "@/apis/repository/order.repository";
import { PaginationForSC } from "@/components/globals/PaginationForSC";

import RefundBtn from "@/components/orders/RefundBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleErrorForServerComponent } from "@/lib/error-handler";
import { OrderItem } from "@/types/order";

export default async function OrderListPage({
  searchParams: { page },
}: {
  searchParams: { page: number };
}) {
  const result = await getMyOrdersRequest(page);

  if ("error" in result) {
    return handleErrorForServerComponent(result);
  }

  const orders = result.results;

  return (
    <div className="container mx-auto py-10 space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>주문 내역</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문 번호</TableHead>
                  <TableHead>날짜</TableHead>
                  <TableHead>총액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>환불</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRowItem order={order} key={order.orderId} />
                ))}
              </TableBody>
            </Table>
          ) : (
            <h3 className="mt-2 text-center">주문 내역이 없습니다</h3>
          )}
        </CardContent>
      </Card>

      <PaginationForSC pagingData={result} />
    </div>
  );
}

function TableRowItem({ order }: { order: OrderItem }) {
  return (
    <TableRow key={order.merchantUid}>
      <TableCell>{order.merchantUid}</TableCell>
      <TableCell>{order.updatedAt}</TableCell>
      <TableCell>
        {order.totalPrice}
        {order.moneyType === "REAL_MONEY" ? "₩" : "⭐️"}
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            order.orderStatus === "OK"
                              ? "bg-green-100 text-green-800"
                              : order.orderStatus === "REQUEST_PAYMENT"
                              ? "bg-blue-100 text-blue-800"
                              : order.orderStatus === "CANCELED"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
        >
          {order.orderStatus}
        </span>
      </TableCell>
      <TableCell>
        {order.orderStatus === "OK" && <RefundBtn order={order} />}
      </TableCell>
    </TableRow>
  );
}
