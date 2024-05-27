import { CardRow } from "@/components/Card";
import Content from "@/core/layouts/Content.tsx";
import { useSparePart } from "@/services/SparePart";
import { Card, Spin } from "antd";
import { useParams } from "react-router-dom";

const SparePartDetail = () => {
  const { uuid } = useParams();
  const { data: sparePart } = useSparePart({ uuid });
  return (
    <Content title="Spare Part" backButtonUrl="/spare-parts">
      <Spin spinning={!sparePart}>
        <Card className="w-1/4">
          <CardRow label="Category" value="Apple / iPhone 6" />
          <CardRow label="Name" value={sparePart?.name} />
          <CardRow label="Price" value={sparePart?.priceWithCurrency} />
          <CardRow label="Amount" value={sparePart?.amount} />
          <CardRow label="Left Amount" value={sparePart?.leftAmount} />
        </Card>
      </Spin>
    </Content>
  );
};

export default SparePartDetail;
