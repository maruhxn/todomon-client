import { getMyOrdersRequest } from "@/apis/repository/order.repository";
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

export default async function OrderListPage() {
  const result = await getMyOrdersRequest();

  if ("error" in result) {
    return handleErrorForServerComponent(result);
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>주문 내역</CardTitle>
        </CardHeader>
        <CardContent>
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
              {result?.length > 0 ? (
                result.map((order) => (
                  <TableRowItem order={order} key={order.orderId} />
                ))
              ) : (
                <h3>주문 내역이 없습니다.</h3>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
