/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import { CfnNotebookInstance } from '@aws-cdk/aws-sagemaker';
import { CfnResource, Stack } from '@aws-cdk/core';

/**
 * SageMaker notebook instances utilize KMS keys for encryption at rest - (Control IDs: AU-9(3), CP-9d, SC-8(3), SC-8(4), SC-13a, SC-28(1), SI-19(4))
 * @param node the CfnResource to check
 */
export default function (node: CfnResource): boolean {
  if (node instanceof CfnNotebookInstance) {
    //Does this notebook have a KMS key ID?
    const kmsKey = Stack.of(node).resolve(node.kmsKeyId);
    if (kmsKey == undefined) {
      return false;
    }
  }
  return true;
}
