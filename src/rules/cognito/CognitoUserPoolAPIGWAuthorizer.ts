/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { parse } from 'path';
import { CfnMethod } from '@aws-cdk/aws-apigateway';
import { CfnResource } from '@aws-cdk/core';

/**
 * Rest API methods use Cognito User Pool Authorizers
 * @param node the CfnResource to check
 */
export default Object.defineProperty(
  (node: CfnResource): boolean => {
    if (node instanceof CfnMethod) {
      if (node.authorizationType !== 'COGNITO_USER_POOLS') {
        return false;
      }
    }
    return true;
  },
  'name',
  { value: parse(__filename).name }
);