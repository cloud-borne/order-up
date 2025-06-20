import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, Billing, TableClass, TableEncryptionV2, TableV2 } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface DatabaseStackProps extends StackProps {
  tableName: string,
}

export class DatabaseStack extends Stack {

  public readonly table: TableV2;

  constructor(scope: Construct, id: string, props?: DatabaseStackProps) {
    super(scope, id, props);
    // DynamoDB table
    this.table = new TableV2(this, 'OrdersTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING},
      tableName: props?.tableName,
      encryption: TableEncryptionV2.awsManagedKey(),
      removalPolicy: RemovalPolicy.DESTROY,
      billing: Billing.onDemand(),
      tableClass: TableClass.STANDARD
    })
  }
}