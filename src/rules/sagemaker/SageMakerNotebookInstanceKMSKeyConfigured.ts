/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { parse } from 'path';
import { CfnNotebookInstance } from '@aws-cdk/aws-sagemaker';
import { CfnResource, Stack } from '@aws-cdk/core';

/**
 * SageMaker notebook instances utilize KMS keys for encryption at rest
 * @param node the CfnResource to check
 */
export default Object.defineProperty(
  (node: CfnResource): boolean => {
    if (node instanceof CfnNotebookInstance) {
      const kmsKey = Stack.of(node).resolve(node.kmsKeyId);
      if (kmsKey == undefined) {
        return false;
      }
    }
    return true;
  },
  'name',
  { value: parse(__filename).name }
);