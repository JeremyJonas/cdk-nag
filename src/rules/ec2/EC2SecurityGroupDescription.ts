/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { parse } from 'path';
import { CfnSecurityGroup } from '@aws-cdk/aws-ec2';
import { CfnResource } from '@aws-cdk/core';
import { resolveIfPrimitive } from '../../nag-pack';

/**
 * Security Groups have descriptions
 * @param node the CfnResource to check
 */
export default Object.defineProperty(
  (node: CfnResource): boolean => {
    if (node instanceof CfnSecurityGroup) {
      const description = resolveIfPrimitive(node, node.groupDescription);
      if (description.length < 2) {
        return false;
      }
    }
    return true;
  },
  'name',
  { value: parse(__filename).name }
);