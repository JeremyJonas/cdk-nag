/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { CfnStream } from '@aws-cdk/aws-kinesis';
import { CfnResource, Stack } from '@aws-cdk/core';

/**
 * Kinesis Data Streams use the "aws/kinesis" key when server-sided encryption is enabled
 * @param node the CfnResource to check
 */
export default function (node: CfnResource): boolean {
  if (node instanceof CfnStream) {
    const streamEncryption = Stack.of(node).resolve(node.streamEncryption);
    if (streamEncryption !== undefined) {
      if (streamEncryption.keyId !== 'alias/aws/kinesis') {
        return false;
      }
    }
  }
  return true;
}